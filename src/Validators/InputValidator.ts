import { ValidationMessage } from "../ClientApi";
import { isNullOrEmpty, isString } from "../Helpers/StringHelper.ts";
import { isNumeric } from "../Helpers/NumberHelper.ts";

export const validateText = (value: unknown): ValidationMessage | undefined => {
  if (!isString(value)) {
    return { message: `Expected a string but received a: ${typeof value}`, type: "error" } as ValidationMessage;
  }
  if (isNullOrEmpty(value)) {
    return { message: "Please fill in a name", type: "error" } as ValidationMessage;
  }

  return undefined;
};

export const validateNumber = (value: unknown): ValidationMessage | undefined => {
  if (!isNumeric(value)) {
    return { message: `Expected a number but received a: ${typeof value}`, type: "error" } as ValidationMessage;
  }
  if (value < 1) {
    return { message: "Your party should at least be 1", type: "error" } as ValidationMessage;
  }

  return undefined;
};
