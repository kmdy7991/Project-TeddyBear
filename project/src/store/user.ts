import { createSlice } from "@reduxjs/toolkit";

interface userReduxProps {
  isLoggedIn: boolean;
  userId: number;
  userNickName: string;
  userTier: string;
}

const initialState: userReduxProps = {
  isLoggedIn: false,
  userId: 0,
  userNickName: "",
  userTier: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload.userId);
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.userNickName = action.payload.userNickName;
      state.userTier = action.payload.userTier;
    },

    logoutUser: (state) => {
      localStorage.clear();
      state.userId = 0;
      state.userNickName = "";
      state.isLoggedIn = false;
      state.userTier = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
