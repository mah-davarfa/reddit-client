import { configureStore } from "@reduxjs/toolkit";
import {postsSlice} from "./features/postsSlice";
import { commentsSlice } from "./features/commentsSlice";

export const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
        comments: commentsSlice.reducer
    }
});