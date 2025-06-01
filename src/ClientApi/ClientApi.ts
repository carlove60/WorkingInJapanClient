import { AddToWaitingListResponse, AddToWaitingListRequest, GetPartyResponse, CheckInResponse } from "./models";
import { PartyClient, WaitingListClient } from "./ApiControllers.ts";
import { isNotNullOrUndefined } from "../Helpers/Guard.ts";
import { WaitingListResponse } from "./models";
import { handleMessages, transformException } from "../Helpers/ApiClientHelper.ts";

export const AddToWaitingList = async (request: AddToWaitingListRequest): Promise<AddToWaitingListResponse> => {
  const resultValue: AddToWaitingListResponse = { messages: [], partyName: "" };
  try {
    const response = await WaitingListClient.addPartyToWaitinglist(request);
    if (isNotNullOrUndefined(response.messages) && response.messages.length > 0) {
      resultValue.messages.push(...response.messages);
    }
  } catch (exception) {
    const responseMessage = await transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
};

export const GetWaitingList = async (): Promise<WaitingListResponse> => {
  let resultValue: WaitingListResponse = {
    waitingList: { seatsAvailable: 0, name: "" },
    messages: [],
  };
  try {
    resultValue = await WaitingListClient.getWaitingList();
  } catch (exception) {
    const responseMessage = await transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
};

export const GetParty = async (): Promise<GetPartyResponse> => {
  let resultValue: GetPartyResponse = {
    messages: [],
    party: {},
  };
  try {
    resultValue = await PartyClient.getParty();
  } catch (exception) {
    const responseMessage = await transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
};

export const CheckIn = async (): Promise<CheckInResponse> => {
  let resultValue: CheckInResponse = {
    messages: [],
    success: false,
  };
  try {
    resultValue = await PartyClient.checkIn();
  } catch (exception) {
    const responseMessage = await transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
};
