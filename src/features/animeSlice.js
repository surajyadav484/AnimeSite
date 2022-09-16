import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ANIME_URL = "https://api.jikan.moe/v4/anime";

export const fetchAnimeData = createAsyncThunk("anime/fetchAnime", async () => {
  const response = await axios.get(ANIME_URL);
  return response.data.data;
});

export const initialState = {
  animes: [],
  status: "idle",
  error: "",
};

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAnimeData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAnimeData.fulfilled, (state, action) => {
      state.status = "success";

      state.animes = action.payload;
    });
    builder.addCase(fetchAnimeData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllAnimes = (state) => state.animes.animes;

export const { clearAnime } = animeSlice.actions;

export default animeSlice.reducer;
