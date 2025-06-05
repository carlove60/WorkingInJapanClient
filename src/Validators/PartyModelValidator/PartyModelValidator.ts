import { MessageType, ValidationMessage, PartyDto } from "../../ClientApi";
import { isNullOrEmpty } from "../../Helpers/StringHelper/StringHelper.ts";
import { isNumeric } from "../../Helpers/NumberHelper/NumberHelper.ts";
import { isNullOrUndefined } from "../../Helpers/Guard/Guard.ts";

export interface ExtendedValidationMessage extends ValidationMessage {
  field: keyof PartyDto | undefined;
}

export interface PartyDtoValidatorModel {
  party: PartyDto;
  seatsAvailable: number | undefined;
}

export const validatePartyDto = (model: PartyDtoValidatorModel | undefined): ExtendedValidationMessage[] => {
  const validationMessages: ExtendedValidationMessage[] = [];
  if (isNullOrUndefined(model)) {
    return validationMessages;
  }
  if (isNullOrEmpty(model.party?.name)) {
    const validationMessage: ExtendedValidationMessage = {
      type: MessageType.Error,
      message: "Please enter the name of your party",
      field: "name",
    };
    validationMessages.push(validationMessage);
  }
  if (!isNumeric(model.party?.size)) {
    const validationMessage: ExtendedValidationMessage = {
      type: MessageType.Error,
      message: "Please enter the size of your party",
      field: "size",
    };
    validationMessages.push(validationMessage);
  }

  if (isNumeric(model.party?.size) && model.party?.size < 1) {
    const validationMessage: ExtendedValidationMessage = {
      type: MessageType.Error,
      message: "Your party must be at least be 1 person",
      field: "size",
    };
    validationMessages.push(validationMessage);
  }

  if (
    isNullOrUndefined(model.seatsAvailable) ||
    (isNumeric(model.party?.size) && model.party?.size > model.seatsAvailable)
  ) {
    const validationMessage: ExtendedValidationMessage = {
      message: `Your party size of ${model.party?.size} is larger than the total of ${model.seatsAvailable} seats available`,
      type: "error",
      field: "size",
    };
    validationMessages.push(validationMessage);
  }
  return validationMessages;
};
