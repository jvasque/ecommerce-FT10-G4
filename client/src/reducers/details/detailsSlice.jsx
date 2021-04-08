import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadDetail = createAsyncThunk("Get/", async (id) => {
  const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
});

export const detailSlice = createSlice({
  name: "productDetails",
  initialState: {
    productDetail: {},
    loadingDetail: false,
  },
  reducer: {

  },
  extraReducers: {
    [loadDetail.pending]: (state) => {
      state.loadingDetail = false;
    },
    [loadDetail.fulfilled]: (state, { payload }) => {
      state.productDetail = payload;
      state.loadingDetail = true;
    },
    [loadDetail.rejected]: (state) => {
      state.loadingDetail = false;
    },
  },
});

const { actions, reducer } = detailSlice;
export const { getDetail } = actions;

export default reducer;
