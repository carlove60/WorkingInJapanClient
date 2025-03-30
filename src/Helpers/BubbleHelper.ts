import {IBubble} from "../Components/Error/BubbleSlice.ts";


export const groupMessages = (messages: IBubble[])=> {
    if (!messages || !messages.length) {
        return null;
    }
    return messages.reduce<Record<string, IBubble[]>>((acc, message) => {
        const {type} = message;

        if (type && !acc[type]) {
            acc[type] = [];
        }

        if (type) {
            acc[type].push(message);
        }

        return acc;
    }, {});
}