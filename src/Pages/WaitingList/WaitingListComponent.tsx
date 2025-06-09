import * as React from "react";
import AddToWaitingListComponent from "../../Components/AddToWaitingList/AddToWaitingListComponent.tsx";
import PartyComponent from "../../Components/PartyComponent/PartyComponent.tsx";
import { PartyDto, ValidationMessage, WaitingListDto } from "../../ClientApi";
import { GetParty, GetWaitingList } from "../../ClientApi/ClientApi.ts";
import { Paper } from "@mui/material";
import MessageComponent from "../../Components/Error/MessageComponent.tsx";
import Box from "@mui/material/Box";
import { EventSourceHandler, useEventSource } from "../../Hooks/UseEventSource/useEventSource.ts";
import Paths from "../../Constants/Paths.ts";

const WaitingListComponent = () => {
  const [party, setParty] = React.useState<PartyDto>();
  const [waitingList, setWaitingList] = React.useState<WaitingListDto>();
  const [messages, setMessages] = React.useState<ValidationMessage[]>([]);

  const monitorPartyCheckInEventSource: EventSourceHandler = {
    url: Paths.SseMonitorDtos,
    onMessage: (event) => {
      const result: { name: "PartyDto" | "WaitingListDto"; dto: PartyDto | WaitingListDto } = JSON.parse(event.data);
      if (result.name === "PartyDto") {
        if ((result.dto as PartyDto).isServiceDone) {
          setParty({});
        } else {
          setParty(result.dto);
        }
      } else if (result.name === "WaitingListDto") {
        setWaitingList(result.dto as WaitingListDto);
      }
    },
  };

  useEventSource([monitorPartyCheckInEventSource], party);

  React.useEffect(() => {
    refreshParty();
    refreshWaitingList();
  }, []);

  const refreshParty = React.useCallback(async () => {
    const partyResponse = await GetParty();
    setParty(partyResponse?.party ?? {});
  }, []);

  const refreshWaitingList = React.useCallback(async () => {
    const waitingListResponse = await GetWaitingList();
    setWaitingList(waitingListResponse?.waitingList);
  }, []);

  const getCurrentComponent = () => {
    return party === undefined ? (
      <div>少々お待ちください。。。</div>
    ) : party.sessionId && !party.isServiceDone ? (
      <PartyComponent party={party} setMessages={setMessages} onCheckIn={(party) => setParty(party)} />
    ) : (
      <AddToWaitingListComponent
        onSignUp={setParty}
        waitingListName={waitingList?.name}
        parties={waitingList?.parties}
        seatsAvailable={waitingList?.seatsAvailable}
        setMessages={setMessages}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <MessageComponent messages={messages} />
      <Paper elevation={3} sx={{ p: 3, mb: 3, width: 300 }}>
        {getCurrentComponent()}
      </Paper>
    </Box>
  );
};

export default WaitingListComponent;
