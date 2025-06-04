import { ExtendedValidationMessage } from "../../Validators/PartyModelValidator/PartyModelValidator.ts";
import { MessageType, ValidationMessage } from "../../ClientApi";
import { isNullOrUndefined } from "../Guard/Guard.ts";

export function getMessageForProperty<T>(
  fieldName: keyof T,
  validationMessages: ExtendedValidationMessage[],
  type: MessageType,
): string {
  return validationMessages.filter((x) => x.field === fieldName && x.validationMessage.type === type)[0]
    ?.validationMessage.message;
}

export function hasErrors(validationMessages: ValidationMessage[]): boolean {
  if (isNullOrUndefined(validationMessages) || validationMessages.length === 0) {
    return false;
  }

  return validationMessages.some((x) => x.type === MessageType.Error);
}
