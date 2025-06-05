import { MessageType, ValidationMessage, PartyDto } from "../../ClientApi";
import { isNullOrEmpty } from "../../Helpers/StringHelper/StringHelper.ts";
import { isNumeric } from "../../Helpers/NumberHelper/NumberHelper.ts";
import { isNullOrUndefined } from "../../Helpers/Guard/Guard.ts";

export interface ExtendedValidationMessage extends ValidationMessage {
  field: keyof PartyDto | undefined;
}

export const validatePartyDto = (model: PartyDto | undefined): ExtendedValidationMessage[] => {
  const validationMessages: ExtendedValidationMessage[] = [];
  if (isNullOrUndefined(model)) {
    return validationMessages;
  }
  if (isNullOrEmpty(model.name)) {
    const validationMessage: ExtendedValidationMessage = {
      type: MessageType.Error,
      message: "Please enter the name of your party",
      field: "name",
    };
    validationMessages.push(validationMessage);
  }
  if (!isNumeric(model.size)) {
    const validationMessage: ExtendedValidationMessage = {
      type: MessageType.Error,
      message: "Please enter the size of your party",
      field: "size",
    };
    validationMessages.push(validationMessage);
  }

  if (isNumeric(model.size) && model.size < 1) {
    const validationMessage: ExtendedValidationMessage = {
      type: MessageType.Error,
      message: "Your party must be at least be 1 person",
      field: "size",
    };
    validationMessages.push(validationMessage);
  }
  return validationMessages;
};
