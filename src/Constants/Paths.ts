import { BASE_PATH } from "../ClientApi";

const Paths = {
  WaitingList: "waitinglist",
  SseMonitorPartyCheckIn: `${BASE_PATH}/api/sse/sse-monitor-party-checkin`,
  SseMonitorPartyServiceDone: `${BASE_PATH}/api/sse/sse-monitor-party-service-done`,
  SseMonitorWaitingList: `${BASE_PATH}/api/sse/sse-monitor-waiting-list`,
  SseMonitorDtos: `${BASE_PATH}/api/sse/dto-update`,
};

export default Paths;
