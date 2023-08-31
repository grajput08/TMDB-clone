import { configureStore } from "@reduxjs/toolkit";
import watchReducer from "./watchSlice";

const store = configureStore({
  reducer: {
    watch: watchReducer,
  },
});

export default store;
