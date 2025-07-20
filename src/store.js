import { configureStore } from "@reduxjs/toolkit";
import {postsSlice} from "./features/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
    }
});