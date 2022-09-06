import { combineReducers, configureStore, getDefaultMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import logger from "redux-logger";
import mobileReducer from "../features/mobile/mobileSlice";
import productReducer from "../features/product/productSlice";


const reducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    product: productReducer,
    mobile: mobileReducer,
  })(state, action);
}

const makeStore = () => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

const store = makeStore();

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;