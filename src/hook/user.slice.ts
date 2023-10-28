import { createSlice } from "@reduxjs/toolkit";

interface UserState {
   user: {};
}

const initialState: UserState = {
   user: {},
};

const UserSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
});

export const {} = UserSlice.actions;

export default UserSlice.reducer;
