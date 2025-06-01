import * as React from "react";
import AddToWaitingListComponent from "../../Components/AddToWaitingList/AddToWaitingListComponent.tsx";
import PartyComponent from "../../Components/PartyComponent.tsx";
import { PartyDto, WaitingListDto } from "../../ClientApi";
import { GetParty, GetWaitingList } from "../../ClientApi/ClientApi.ts";

const WaitingListPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [waitingList, setWaitingList] = React.useState<WaitingListDto>();
  const [partyLoaded, setPartyLoaded] = React.useState(false);
  const [party, setParty] = React.useState<PartyDto | undefined>(undefined);

  const refreshParty = async () => {
    const partyResponse = await GetParty();
    if (partyResponse.party !== party) {
      setPartyLoaded(false);
      setParty(partyResponse.party);
      setPartyLoaded(true);
    }
    return partyResponse.party;
  };

  React.useEffect(() => {
    if (party === undefined) {
      (async function () {
        setIsLoading(true);
        const waitingListResponse = await GetWaitingList();
        setWaitingList(waitingListResponse.waitingList);
        setIsLoading(false);
      })();
    }
  }, [party]);

  React.useEffect(() => {
    refreshParty();

    const interval = setInterval(async () => {
      refreshParty();
    }, 3000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return isLoading || !partyLoaded ? (
    <div>少々お待ちください。。。</div>
  ) : party ? (
    <PartyComponent isLoading={isLoading} party={party} />
  ) : (
    <AddToWaitingListComponent
      isLoading={isLoading}
      waitingListName={waitingList?.name ?? ""}
      parties={waitingList?.parties}
      seatsAvailable={waitingList?.seatsAvailable}
      onCheckIn={setParty}
    />
  );
};

export default WaitingListPage;
