import { ValidationMessage } from "../../ClientApi";

export const groupMessages = (messages: ValidationMessage[]) => {
  if (!messages || !messages.length) {
    return null;
  }
  return messages.reduce<Record<string, ValidationMessage[]>>((groupedMessages, message) => {
    const { type } = message;

    if (type && !groupedMessages[type]) {
      groupedMessages[type] = [];
    }

    if (type) {
      groupedMessages[type].push(message);
    }

    return groupedMessages;
  }, {});
};
