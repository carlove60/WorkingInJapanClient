import * as React from "react";
import AddToWaitingListComponent from "../../Components/AddToWaitingList/AddToWaitingListComponent.tsx";
import PartyComponent from "../../Components/PartyComponent/PartyComponent.tsx";
import { PartyDto, ValidationMessage, WaitingListDto } from "../../ClientApi";
import { GetParty, GetWaitingList } from "../../ClientApi/ClientApi.ts";
import { usePolling } from "../../Hooks/UsePolling/usePolling.ts";
import { isNotNullOrEmpty } from "../../Helpers/StringHelper/StringHelper.ts";
import { isNotNullOrUndefined } from "../../Helpers/Guard/Guard.ts";
import { Paper } from "@mui/material";
import MessageComponent from "../../Components/Error/MessageComponent.tsx";
import Box from "@mui/material/Box";

const WaitingListComponent = () => {
  const [party, setParty] = React.useState<PartyDto>();
  const [waitingList, setWaitingList] = React.useState<WaitingListDto>();
  const [messages, setMessages] = React.useState<ValidationMessage[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      // Just to see if there is already a party for this session
      // No need to show any messages
      refreshParty();
    };

    fetchData();
  }, []);

  const refreshParty = React.useCallback(async () => {
    const partyResponse = await GetParty();
    setParty(partyResponse?.party ?? {});
  }, [setParty]);

  const refreshWaitingList = React.useCallback(async () => {
    const waitingListResponse = await GetWaitingList();
    setWaitingList(waitingListResponse?.waitingList);
  }, [setWaitingList]);

  const enableRefreshParty = (): boolean => {
    return isNotNullOrUndefined(party) && isNotNullOrEmpty(party.sessionId);
  };

  const enableRefreshWaitingList = (): boolean => {
    return isNotNullOrUndefined(party);
  };

  usePolling(refreshParty, enableRefreshParty());
  usePolling(refreshWaitingList, enableRefreshWaitingList());

  const getCurrentComponent = () => {
    return party === undefined ? (
      <div>少々お待ちください。。。</div>
    ) : party.sessionId ? (
      <PartyComponent party={party} setMessages={setMessages} />
    ) : (
      <AddToWaitingListComponent
        onSignUp={setParty}
        waitingListName={waitingList?.name}
        parties={waitingList?.parties}
        seatsAvailable={waitingList?.seatsAvailable}
        messages={messages}
        setMessages={setMessages}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <MessageComponent messages={messages} onClose={() => setMessages([])} />
      <Paper elevation={3} sx={{ p: 3, mb: 3, width: 300 }}>
        {getCurrentComponent()}
      </Paper>
    </Box>
  );
};

export default WaitingListComponent;
