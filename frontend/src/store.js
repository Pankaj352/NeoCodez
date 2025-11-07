import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogReducer from "./slices/blogSlice";
import guideReducer from "./slices/guideSlice";
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    guides: guideReducer,
    projects: projectReducer,
    users: userReducer,
  },
});

export default store;
