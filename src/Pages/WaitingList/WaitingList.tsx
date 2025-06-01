import * as React from "react";
import AddToWaitingListComponent from "../../Components/AddToWaitingList/AddToWaitingListComponent.tsx";
import PartyComponent from "../../Components/PartyComponent.tsx";
import { PartyDto, WaitingListDto } from "../../ClientApi";
import { GetParty, GetWaitingList } from "../../ClientApi/ClientApi.ts";

const WaitingListPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [waitingList, setWaitingList] = React.useState<WaitingListDto>();
  const [, setRefresh] = React.useState(false);
  const [party, setParty] = React.useState<PartyDto>();

  const refreshParty = async () => {
    setIsLoading(true);
    const partyResponse = await GetParty();
    setParty(partyResponse.party);
    setIsLoading(false);
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
    (async function () {
      setInterval(() => {
        setRefresh((toggle) => !toggle);
      }, 3000);

      return () => refreshParty();
    })();
  }, []);

  return isLoading ? (
    <div>少々お待ちください。。。</div>
  ) : party ? (
    <PartyComponent isLoading={isLoading} party={party} />
  ) : (
    <AddToWaitingListComponent
      isLoading={isLoading}
      waitingListName={waitingList?.name ?? ""}
      parties={waitingList?.parties}
      seatsAvailable={waitingList?.seatsAvailable}
    />
  );
};

export default WaitingListPage;
