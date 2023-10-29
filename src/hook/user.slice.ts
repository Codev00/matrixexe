import { UserType } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
   user: UserType;
}

const initialState: UserState = {
   user: {
      _id: "",
      displayName: "",
      email: "",
      username: "",
      password: "",
      status: false,
      verify: false,
      favorites: [],
   },
};

const UserSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action) => {
         if (action.payload.token === null) {
            localStorage.removeItem("acc_token");
         }
         if (action.payload.token) {
            localStorage.setItem("acc_token", action.payload.token);
         }
         state.user = action.payload;
      },
      logout: (state) => {
         if (localStorage.getItem("acc_token")) {
            localStorage.removeItem("acc_token");
         }

         state.user = {
            _id: "",
            displayName: "",
            email: "",
            username: "",
            password: "",
            status: false,
            verify: false,
            favorites: [],
         };
      },
   },
});

export const { setUser, logout } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default UserSlice.reducer;
