import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {}

const initialState: GlobalState = {};

const GlobalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {},
});

export const {} = GlobalSlice.actions;

export default GlobalSlice.reducer;
