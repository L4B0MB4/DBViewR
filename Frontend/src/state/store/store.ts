import { configureStore } from "@reduxjs/toolkit";
import erm from "../features/erm/erm";
import tabledata from "../features/erm/tabledata";
export const store = configureStore({
  reducer: {
    erm,
    tabledata,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
