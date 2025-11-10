import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../utils/api'; // wrapped axios instance

// ===============================
// Async Thunks
// ===============================
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials); // returns user object with token
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token && user) {
        return { token, user };
      }
      return rejectWithValue('No token found');
    } catch (error) {
      return rejectWithValue('Failed to parse user data');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error.response || error.message);
      return rejectWithValue(error.response?.data?.error || 'Registration failed');
    }
  }
);

// ===============================
// Initial State
// ===============================
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  statusMessage: null,
  statusType: null,
};

// ===============================
// Slice
// ===============================
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.statusMessage = null;
      state.statusType = null;
    },
    setStatus: (state, action) => {
      state.statusMessage = action.payload.message;
      state.statusType = action.payload.type;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.statusMessage = null;
      state.statusType = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.statusMessage = null;
        state.statusType = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Your backend sends the full user + token directly
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };

        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.statusMessage = 'Login successful!';
        state.statusType = 'success';

        // ✅ Persist login info
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.statusMessage = action.payload;
        state.statusType = 'error';
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.statusMessage = null;
        state.statusType = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.statusMessage = 'Registration successful! Please sign in.';
        state.statusType = 'success';
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.statusMessage = action.payload;
        state.statusType = 'error';
      });
  },
});

export const { clearStatus, setStatus, logout } = authSlice.actions;
export default authSlice.reducer;
