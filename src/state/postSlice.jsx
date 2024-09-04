import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {records:[], loading:false , error:null};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async(args , thunkAPI)=>{
     const {rejectWithValue} = thunkAPI;
    try{
        const res = await fetch('http://localhost:5000/posts');
        const data = await res.json();
        return data;

    }catch(error){
        return rejectWithValue(error.message);
        //we add error message as value to thunkAPI 

    }

});
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        //here we listen to actions returning from get posts to handles state
        builder
        .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;//we need to reset it when retry after rejected
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
        
        })
        .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload;//now action payload is rejectWithValue for the error message
        state.loading = false;
        });
    }
    
})
export  default postSlice.reducer;


