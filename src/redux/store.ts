import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from "./categorySlice"
import paginationReducer from './paginationSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    pagination:paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
