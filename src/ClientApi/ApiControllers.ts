import { Configuration } from "./runtime.ts";
import { WaitingListApi, PartyApi } from "./apis";
import { AddToWaitingListRequest } from "./models";

const customFetch: typeof fetch = (input: RequestInfo | URL, init = {}) => {
  return fetch(input, {
    ...init,
    credentials: "include", // Make sure cookies are sent and received
  });
};

const config = new Configuration({
  fetchApi: customFetch,
});

const waitingListApi = new WaitingListApi(config);
const partyApi = new PartyApi(config);

export const WaitingListClient = {
  getWaitingList: () => waitingListApi.apiWaitingListWaitingListGet(),
  addPartyToWaitinglist: (request: AddToWaitingListRequest) =>
    waitingListApi.apiWaitingListAddPartyToWaitinglistPost({ addToWaitingListRequest: request }),
};

export const PartyClient = {
  getParty: () => partyApi.getPartyGet(),
  checkIn: () => partyApi.apiPartyCheckInPost(),
};
