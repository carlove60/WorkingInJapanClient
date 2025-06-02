import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./Components/Bubble/BubbleSlice.ts"; // Import the error reducer

export const store = configureStore({
  reducer: {
    error: errorReducer, // Add the error slice to the Redux store
  },
});

// Define RootState type (used for type safety in selectors)
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch for use in components
export type AppDispatch = typeof store.dispatch;
