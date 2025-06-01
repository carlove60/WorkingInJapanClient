import { PartyDto } from "../../ClientApi";
import { isNullOrUndefined } from "../../Helpers/Guard.ts";
import * as React from "react";

interface Props {
  parties: PartyDto[] | undefined;
  availableSeats: number | undefined;
}

const CurrentQueue = ({ parties, availableSeats }: Props): React.ReactElement | null => {
  if (isNullOrUndefined(parties) || parties.length === 0) {
    return null;
  }

  return (
    <>
      <div>Total seats available: {availableSeats ?? 0}</div>
      <h2 className="text-lg font-semibold">Queue</h2>
      <ul className="list-disc pl-5">
        {parties.map((party) => (
          <li key={party.waitingListName}>
            {party.name} ({party.size})
          </li>
        ))}
      </ul>
    </>
  );
};

export default CurrentQueue;
