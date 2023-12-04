import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "./store";
import { GenreType, MovieType } from "@/types/media.type";
import { setCookie } from "cookies-next";

interface GlobalState {
   isActive: string;
   listMovie: MovieType[];
   Genres: GenreType[];
   premium: boolean;
}

const initialState: GlobalState = {
   isActive: "",
   listMovie: [],
   Genres: [],
   premium: false,
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
      setPremium: (state, action) => {
         state.premium = action.payload;
         setCookie("acc_premium", action.payload);
      },
   },
});

export const { setActive, setGenres, setListMovie, setPremium } =
   GlobalSlice.actions;

export const listGenres = (state: RootState) => state.global.Genres;
export const Movie = (state: RootState) => state.global.listMovie;
export const Premium = (state: RootState) => state.global.premium;

export default GlobalSlice.reducer;
