import { ExtendedValidationMessage } from "../Validators/PartyModelValidator.ts";
import { MessageType } from "../ClientApi";

export function getMessageForProperty<T>(
  fieldName: keyof T,
  validationMessages: ExtendedValidationMessage[],
  type: MessageType,
): string {
  return validationMessages.filter((x) => x.field === fieldName && x.validationMessage.type === type)[0]
    ?.validationMessage.message;
}
