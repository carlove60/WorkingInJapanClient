import { isNumeric } from "../Helpers/NumberHelper.ts";
import { ValidationMessage } from "../ClientApi";

export const validatePartySize = (
  partySize: number | undefined,
  totalSeatsAvailable: number,
): ValidationMessage | undefined => {
  if (isNumeric(partySize) && partySize > totalSeatsAvailable) {
    return {
      message: `Your party size of ${partySize} is larger than the total of ${totalSeatsAvailable} seats available`,
      type: "Error",
    } as ValidationMessage;
  }

  return undefined;
};
