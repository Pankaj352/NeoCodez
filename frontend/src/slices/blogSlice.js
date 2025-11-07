import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import API_URL from "../utils/api"

// Async thunks
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/blogs`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch blogs");
  }
});

export const createBlog = createAsyncThunk("blogs/create", async (blogData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/blogs`, blogData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create blog");
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default blogSlice.reducer;
