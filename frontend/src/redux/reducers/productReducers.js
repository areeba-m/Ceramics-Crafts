import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedProducts = createAsyncThunk(
  "/products/fetchedProducts",
  async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
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
    builder
      .addCase(fetchedProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
