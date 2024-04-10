import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loadingSlice, { loadingActions } from "./loading";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userSlice from "./user";
import cardSlice from "./cardBookmark";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whiteList: ["loading", "user", "cardBookmark"], // persist 할 reducer 목록
};

// 초기화 방지 위한 redux-persist
const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  user: userSlice.reducer,
  cardBookmark: cardSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// persistSotre 함수로 persistor 객체 생성
const persistor = persistStore(store);

// store와 persistor를 내보냄
export { store, persistor };

// store의 타입 미리 export 해두기
export type RootState = ReturnType<typeof store.getState>;
