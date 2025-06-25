import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedProducts = createAsyncThunk(
  "/products/fetchedProducts",
  async () => {
    const { data } = await axios.get(
      // `${import.meta.env.VITE_BASE_URL}/product/fetch-products`,
      `http://localhost:8080/api/products`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     "Content-Type": "application/json",
      //   },
      // }
      {
        credentials: "include", // or 'same-origin' if on same origin
        headers: {
          'Authorization': 'Basic ' + btoa('admin:password123') // if not using cookies/session
        }
  }
    );
    // console.log(data.product);
    return data.product;
  }
);

const productSlice = createSlice({
  name: "products",
  //states for products
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedProducts.pending, (state) => {
      (state.loading = true), (state.error = null);
    }).addCase(fetchedProducts.fulfilled, (state, action)=>{
        state.loading = false
        state.items = action.payload
    }).addCase(fetchedProducts.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
    })
  },
});

export default productSlice.reducer;
