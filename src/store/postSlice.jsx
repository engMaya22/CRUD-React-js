import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {records:[], loading:false , error:null , record:null};
//get posts
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
//fetch posts
export const fetchPost = createAsyncThunk('posts/fetchPost', async(id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
   try{
       const res = await fetch(`http://localhost:5000/posts/${id}`);
       const data = await res.json();
       return data;

   }catch(error){
       return rejectWithValue(error.message);

   }

});

//add post
export const insertPost = createAsyncThunk('posts/insertPost', async(dataPost , thunkAPI)=>{
    const {rejectWithValue , getState} = thunkAPI;
    const {auth} = getState();
    dataPost.userId = auth.id;
   try{
        const requestData = {
            method: "POST",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body : JSON.stringify(dataPost)

        }
       const res = await fetch('http://localhost:5000/posts',requestData);
       const data = await res.json();
       return data;//as payload to add it to state when successfuly add it to server by api

   }catch(error){
       return rejectWithValue(error.message);
       //we add error message as value to thunkAPI 

   }

});

//edit post
export const editPost = createAsyncThunk('posts/editPost', async(item , thunkAPI)=>{
    const {rejectWithValue } = thunkAPI;
   try{
        const requestData = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body : JSON.stringify(item)

        }
       const res = await fetch(`http://localhost:5000/posts/${item.id}`,requestData);
       const data = await res.json();
       return data;//as payload to add it to state when successfuly add it to server by api

   }catch(error){
       return rejectWithValue(error.message);

   }

});

//delete post
export const deletePost = createAsyncThunk('posts/deletePost', async(id , thunkAPI)=>{
    const {rejectWithValue } = thunkAPI;
     try{
        await fetch(`http://localhost:5000/posts/${id}`,{
            method:"DELETE",
        })
        return id ; //cause I need this data to make filter from state after success delete from server

     }catch(error){
        return rejectWithValue(error.message);

     }

});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        cleanRecord :(state)=>{
            state.record = null;
        }
    },

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
        })

        //get post 
        .addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = null;//we need to reset it when retry after rejected
            })
        .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
            
            })
        .addCase(fetchPost.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            })

        //add post
        .addCase(insertPost.pending, (state) => {
            state.loading = true;
            state.error = null;//we need to reset it when retry after rejected
            })
        .addCase(insertPost.fulfilled, (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
            
            })
        .addCase(insertPost.rejected, (state, action) => {
            state.error = action.payload;//now action payload is rejectWithValue for the error message
            state.loading = false;
            })

        //edit post
        .addCase(editPost.pending, (state) => {
            state.loading = true;
            state.error = null;//we need to reset it when retry after rejected
            })
        .addCase(editPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record= action.payload;
            
            })
        .addCase(editPost.rejected, (state, action) => {
            state.error = action.payload;//now action payload is rejectWithValue for the error message
            state.loading = false;
            })


        //delete post
        .addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = null;//we need to reset it when retry after rejected
            })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter(item=>item.id !== action.payload);
            
            })
        .addCase(deletePost.rejected, (state, action) => {
            state.error = action.payload;//now action payload is rejectWithValue for the error message
            state.loading = false;
            });
    }
    
})
export const {cleanRecord} = postSlice.actions;
export  default postSlice.reducer;


