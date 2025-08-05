import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    subredditList:{},
    status: 'idle',
    error: null,
}
//lets make connection to either bankend server or to render.com dynamic
const baseUrl = import.meta.env.PROD
  ? 'https://your-backend-name.onrender.com/api'  // PROD → use Render
  : '/api';                                       // DEV → use Vite proxy
export const fetchSubredditListsInStartup = createAsyncThunk('subredditLists/fetchSubredditListsInStartup', async (popular) => {
    const response = await axios.get(`${baseUrl}/subredditlists/${popular}`);

    const lists = response.data.data.children.map((item)=>({
      id: item.data.id,
      name: item.data.display_name,
      title: item.data.title,
      url: item.data.url,
      img: item.data.icon_img,
    }))
    console.log('fetchSubredditListsInStartup response.data.data.children.map((item)=>: ', lists);
    return lists;
})

export const subredditlistsSlice = createSlice({
    name:'subredditlists',
    initialState,
    reducers: {
        // Define any additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchSubredditListsInStartup.pending, (state) => {
            state.status = 'loading';
         })
          .addCase(fetchSubredditListsInStartup.fulfilled, (state, action) => {
            state.status = 'success';
            state.subredditList = action.payload; // this gives us the subreddit list data from the response
          })
          .addCase(fetchSubredditListsInStartup.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message; // Capture the error message
          })
        }

})
export const selectSuretitredditLists = (state) => state.subredditlists.subredditList;
export const selectSubredditListsStatus = (state) => state.subredditlists.status;
export const selectSubredditListsError = (state) => state.subredditlists.error;