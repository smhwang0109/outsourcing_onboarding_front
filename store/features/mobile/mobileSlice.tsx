import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductInfo {
  id?: number;
  image: string;
  title: string;
  category: string;
  price: number;
  detail: string;
  seller: string;
  sellerImg: string;
}

const initialState: boolean = false;

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    mobile: (state) => true,
    pc: (state) => false
  },
});

const { actions, reducer: mobileReducer } = mobileSlice;

export const { mobile, pc } = actions;

export default mobileReducer;
