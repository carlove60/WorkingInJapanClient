import {WaitingListApi} from "./apis";

const waitingListApi = new WaitingListApi();

export const WaitingListClient = {
    getWaitingList: () => waitingListApi.apiWaitinglistWaitingListGet(),
    addPartyToWaitinglist: () => waitingListApi.apiWaitinglistAddPartyToWaitinglistPost(),
    checkIn: () => waitingListApi.apiWaitinglistCheckInPost(),
    getMetaData: () => waitingListApi.apiWaitinglistWaitinglistMetaDataGet()
};