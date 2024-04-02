import { createSlice } from "@reduxjs/toolkit";

interface tokenReduxProps {
  accessToken: string | null;
}

const initialState: tokenReduxProps = {
  accessToken: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export default tokenSlice;
