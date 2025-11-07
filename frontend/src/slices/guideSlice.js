import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../utils/api"

export const fetchGuides = createAsyncThunk("guides/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/guides`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch guides");
  }
});

export const createGuide = createAsyncThunk("guides/create", async (guideData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/guides`, guideData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create guide");
  }
});

const guideSlice = createSlice({
  name: "guides",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGuide.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default guideSlice.reducer;
