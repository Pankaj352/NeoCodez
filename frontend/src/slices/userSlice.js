import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../utils/api"

export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
