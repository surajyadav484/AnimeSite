import { configureStore } from "@reduxjs/toolkit";
import animeSlice from "../features/animeSlice";

export const store = configureStore({
  reducer: {
    animes: animeSlice,
  },
});
