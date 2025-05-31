import { store } from "../store.ts";
import { add } from "../Components/Bubble/BubbleSlice.ts";
import { ValidationMessage, WaitingListMetaDataResponse, AddToWaitingListResponse } from "./models";
import { WaitingListClient } from "./ApiControllers.ts";
import { isNotNullOrUndefined } from "../Helpers/Guard.ts";

export const AddToWaitingList = async (): Promise<AddToWaitingListResponse> => {
  const resultValue: AddToWaitingListResponse = { messages: [], partyName: "" };
  try {
    const response = await WaitingListClient.addPartyToWaitinglist();
    if (isNotNullOrUndefined(response.messages) && response.messages.length > 0) {
      resultValue.messages.push(...response.messages);
    }
  } catch (exception) {
    const responseMessage = transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
};

export const GetDefaultWaitingList = async (): Promise<WaitingListMetaDataResponse> => {
  let resultValue: WaitingListMetaDataResponse = { waitingList: {}, messages: [] };
  try {
    resultValue = await WaitingListClient.getDefaultWaitingList();
  } catch (exception) {
    const responseMessage = transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
};

const transformException = (exception: unknown): ValidationMessage => {
  let errorMessage = "An unknown error occurred, please contact support";
  if (exception instanceof Error) {
    errorMessage = exception.message;
  } else if (typeof exception === "string") {
    errorMessage = exception;
  } else if (typeof exception === "object" && exception !== null && "message" in exception) {
    errorMessage = (exception as ValidationMessage).message;
  }
  return { message: errorMessage, type: "error" };
};

const handleMessages = (messages: ValidationMessage[]): void => {
  messages?.forEach((message) => {
    store.dispatch(add(message));
  });
};
