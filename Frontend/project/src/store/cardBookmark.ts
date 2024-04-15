import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../pages/VocabularyList/MyVocabulary";
const initialState: Word[] = [];

const cardSlice = createSlice({
  name: "cardBookmark",
  initialState,
  reducers: {
    // 북마크 추가
    addBookmark: (state, action) => {
      // 중복된 항목이 없을 경우에만 추가
      const exists = state.find(
        (bookmark) => bookmark.id === action.payload.id
      );
      if (!exists) {
        state.push(action.payload);
      }
    },
    // 북마크 해제
    removeBookmark: (state, action) => {
      return state.filter((bookmark) => bookmark.id !== action.payload);
    },
  },
});

export const CardActions = cardSlice.actions;
export default cardSlice;
