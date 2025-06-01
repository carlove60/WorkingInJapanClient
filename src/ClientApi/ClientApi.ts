import { AddToWaitingListResponse, AddToWaitingListRequest, GetPartyResponse, CheckInResponse } from "./models";
import { PartyClient, WaitingListClient } from "./ApiControllers.ts";
import { WaitingListResponse } from "./models";
import { handleMessages, transformException } from "../Helpers/ApiClientHelper.ts";

export const AddToWaitingList = async (request: AddToWaitingListRequest): Promise<AddToWaitingListResponse> => {
  return await BaseCallWithRequest<AddToWaitingListResponse, AddToWaitingListRequest>(
    WaitingListClient.addPartyToWaitinglist,
    request,
  );
};

export const GetWaitingList = async (): Promise<WaitingListResponse> => {
  return await BaseCall<WaitingListResponse>(WaitingListClient.getWaitingList);
};

export const GetParty = async (): Promise<GetPartyResponse> => {
  return await BaseCall<GetPartyResponse>(PartyClient.getParty);
};

export const CheckIn = async (): Promise<CheckInResponse> => {
  return await BaseCall<CheckInResponse>(PartyClient.checkIn);
};

async function BaseCall<T>(method: () => Promise<T>): Promise<T> {
  let resultValue: T = undefined as unknown as T;
  try {
    resultValue = await method();
  } catch (exception) {
    const responseMessage = await transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
}

async function BaseCallWithRequest<T, R>(method: (request: R) => Promise<T>, request: R): Promise<T> {
  let resultValue: T = undefined as unknown as T;
  try {
    resultValue = await method(request);
  } catch (exception) {
    const responseMessage = await transformException(exception);
    handleMessages([responseMessage]);
  }

  return resultValue;
}
