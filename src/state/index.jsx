import { configureStore } from "@reduxjs/toolkit";
import posts from "./postSlice"



export const store = configureStore({
    reducer : {
        posts 
    }
});