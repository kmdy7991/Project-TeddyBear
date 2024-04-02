import { createSlice } from "@reduxjs/toolkit";

interface userReduxProps {
  isLoggedIn: boolean;
  userId: number;
}

const initialState: userReduxProps = {
  isLoggedIn: false,
  userId: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload.userId);
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },

    logoutUser: (state, action) => {
      console.log(action.payload.userId);
      state.userId = 0;
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
