import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    comment :{},
    status:'idle',
    error: null,
}
//https://www.reddit.com/comments/{postId}.json but we using backend server to get comments
const baseUrl = 'https://reddit-api-backend-hork.onrender.com/api';

export const fetchComments = createAsyncThunk('comments/fetchComments', async(postId)=>{
    console.log('comment Thunk postId: ', postId);
    const response = await axios.get(`${baseUrl}/comments/${postId}`);
    //console.log('comment Thunk  response.data[1].data.children.map((item)=>item.data: ', response.data[1].data.children.map((item)=>item.data));
    //console.log('comment Thunk  response.data[1].data.children.map((item)=>item.data.body: ', response.data[1].data.children.map((item)=>item.data.body));

      const items = response.data[1].data.children.map((item) => item.data);
  const cleanedComments = items.map((comment) => ({
    comment: comment.body,
  }));

  console.log('cleanedComments: ', cleanedComments);
  return cleanedComments;
});
 
export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchComments.fulfilled,(state,action)=>{
            state.status = 'success';
            state.comment = action.payload; // this gives us the comments data from the response
        })
        .addCase(fetchComments.rejected,(state,action)=>{
            state.status ='rejected';
           
        })
    },
})
export const selectComments = (state)=> state.comments.comment; 
export default commentsSlice.reducer;
export const selectCommentsStatus = (state)=> state.comments.status;
export const selectCommentsError = (state)=> state.comments.error;