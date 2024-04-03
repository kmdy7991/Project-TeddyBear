import { createSlice } from "@reduxjs/toolkit";

interface userReduxProps {
  isLoggedIn: boolean;
  userId: number;
  userNickName: string;
}

const initialState: userReduxProps = {
  isLoggedIn: false,
  userId: 0,
  userNickName: "",
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
    },

    logoutUser: (state) => {
      localStorage.clear();
      state.userId = 0;
      state.userNickName = "";
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
