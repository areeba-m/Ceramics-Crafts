import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducers"

export const store = configureStore({
    reducer:{
        products: productReducer
        
    }
})