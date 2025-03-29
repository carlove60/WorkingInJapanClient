import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {MessageType} from "../../../generated-client/models";

export interface InfoObjectType {
    message: string | null | undefined,
    type: MessageType | null | undefined
}
interface ErrorState {
    messages: InfoObjectType[];
}

const initialState: ErrorState = {
    messages: [],
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<InfoObjectType>) => {
            const errorExists = state.messages.filter((message) =>
                message.message === action.payload.message &&
                message.type && action.payload.type )[0];
            if (!errorExists) {
                state.messages.push(action.payload);
            }
        },
        clearBubble: (state, action: PayloadAction<MessageType>) => {
            const bubblesToKeep = state.messages.filter((message) => message.type !== action.type);
            state.messages = bubblesToKeep;
        },
    },
});

export const { add, clearBubble } = errorSlice.actions;
export default errorSlice.reducer;
