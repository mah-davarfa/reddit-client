import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    comment :{},
    status:'idle',
    error: null,
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async(postId)=>{
    const response = await axios.get(`/api/comments/${postId}`);
    console.log('response.data: ', response.data);
    return response.data;
})

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