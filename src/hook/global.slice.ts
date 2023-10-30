import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "./store";
import { GenreType, MovieType } from "@/types/media.type";

interface GlobalState {
   isActive: string;
   listMovie: MovieType[];
   Genres: GenreType[];
}

const initialState: GlobalState = {
   isActive: "",
   listMovie: [],
   Genres: [],
};

const GlobalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setActive: (state, action) => {
         state.isActive = action.payload;
      },
      setListMovie: (state, action) => {
         state.listMovie = action.payload;
      },
      setGenres: (state, action) => {
         state.Genres = action.payload;
      },
   },
});

export const { setActive, setGenres, setListMovie } = GlobalSlice.actions;

export const listGenres = (state: RootState) => state.global.Genres;
export const Movie = (state: RootState) => state.global.listMovie;

export default GlobalSlice.reducer;
