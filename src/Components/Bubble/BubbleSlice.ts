import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType, ValidationMessage } from "../../ClientApi";

interface ErrorState {
  messages: ValidationMessage[];
}

const initialState: ErrorState = {
  messages: [],
};

const bubbleSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ValidationMessage>) => {
      const errorExists = state.messages.filter(
        (message) => message.message === action.payload.message && message.type && action.payload.type,
      )[0];
      if (!errorExists) {
        state.messages.push(action.payload);
      }
    },
    clearBubble: (state, action: PayloadAction<MessageType>) => {
      state.messages = state.messages.filter((message) => message.type !== action.payload);
    },
  },
});

export const { add, clearBubble } = bubbleSlice.actions;
export default bubbleSlice.reducer;
