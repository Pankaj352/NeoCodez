import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../utils/api"

export const fetchProjects = createAsyncThunk("projects/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/projects`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch projects");
  }
});

export const createProject = createAsyncThunk("projects/create", async (projectData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/projects`, projectData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create project");
  }
});

const projectSlice = createSlice({
  name: "projects",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default projectSlice.reducer;
