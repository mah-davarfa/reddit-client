import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    post :[],
    status :  "idle",
    error: null,
    
}
///https://www.reddit.com/search.json?q=cats+playing+piano

// then (slice'sname /thunk function's name) going to be string and goes  to here 
// : createAsyncThunk("posts/fetchposts'', async () => {}) ,
export const fetchposts = createAsyncThunk('posts/fetchposts', async(searchQuery)=>{
    const response = await axios.get(`/api/search?q=${searchQuery}`);
    console.log('raw response.data.data.children.map((item) => item.data): ',response.data.data.children.map((item) => item.data));
    
    const items = response.data.data.children;
      const cleanedposts = items.map((item)=>{
        const post = item.data;
        return {
      id: post.id,
      title: post.title,
      subreddit: post.subreddit,
      url: post.media?.reddit_video?.fallback_url || post.url,
      is_video: post.is_video,
      thumbnail: post.thumbnail,
      media_metadata: post.media_metadata || null,
      gallery_data: post.gallery_data || null,
      ups: post.ups,
      comments:post.num_comments,
    };
      })
    console.log('cleanedposts: ', cleanedposts);
    return  cleanedposts;
})

 export const postsSlice = createSlice({
    // this name which is used in store for rducer(posts: postsSlice.reducer) 
    // "posts" should be match with slice's name, name:'posts' 
    name: 'posts',
    initialState,
    
    reducers: {

    },
    // link the pending, fulfilled, or rejected versions of fetchposts
    extraReducers: (builder)=>{
       builder
        .addCase(fetchposts.pending, (state)=>{
            state.status = 'loading';
            })
        .addCase(fetchposts.fulfilled, (state,action)=>{
            state.status = 'success';
            state.post= action.payload; // this give us raw data from the response
            
         })
        .addCase(fetchposts.rejected, (state,action)=>{
            state.status = 'rejected';
            
            
         })
    }
});
//for the selector in order to extract data for components would be:
//  global state.slice's name(posts).post(which has array of data in it(state))
export const selectorPosts = (state)=>state.posts.post;
export default postsSlice.reducer;
export const selectPostStatus = (state) => state.posts.status;
export const selectPostError = (state) => state.posts.error;
