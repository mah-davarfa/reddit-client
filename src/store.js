import { configureStore } from "@reduxjs/toolkit";
import {postsSlice} from "./features/postsSlice";
import { commentsSlice } from "./features/commentsSlice";
import { subredditlistsSlice } from "./features/subredditlistsSlice";

export const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
        comments: commentsSlice.reducer,
        subredditlists: subredditlistsSlice.reducer
    }
});