import * as React from "react";
import AddToWaitingListComponent from "../../Components/AddToWaitingList/AddToWaitingListComponent.tsx";
import PartyComponent from "../../Components/PartyComponent.tsx";
import { PartyDto, WaitingListDto } from "../../ClientApi";
import { GetParty, GetWaitingList } from "../../ClientApi/ClientApi.ts";
import { usePolling } from "../../Hooks/usePolling.ts";
import { isNotNullOrEmpty } from "../../Helpers/StringHelper.ts";

const WaitingList = () => {
  const [party, setParty] = React.useState<PartyDto>();
  const [waitingList, setWaitingList] = React.useState<WaitingListDto>();

  React.useEffect(() => {
    const fetchData = async () => {
      // Just to see if there is already a party for this session
      // No need to show any messages
      const party = await GetParty();
      setParty(party.party ?? {});
    };

    fetchData();
  }, []);

  const refreshParty = async () => {
    const partyResponse = await GetParty();
    if (partyResponse.party !== party) {
      setParty(partyResponse.party ?? {});
    }
  };

  const refreshWaitingList = async () => {
    const waitingListResponse = await GetWaitingList();
    setWaitingList(waitingListResponse.waitingList);
  };

  usePolling(refreshParty, party !== undefined && isNotNullOrEmpty(party.sessionId));
  usePolling(refreshWaitingList, party === undefined);

  return party === undefined ? (
    <div>少々お待ちください。。。</div>
  ) : party.sessionId ? (
    <PartyComponent party={party} />
  ) : (
    <AddToWaitingListComponent
      onSignUp={setParty}
      waitingListName={waitingList?.name}
      parties={waitingList?.parties}
      seatsAvailable={waitingList?.seatsAvailable}
    />
  );
};

export default WaitingList;
