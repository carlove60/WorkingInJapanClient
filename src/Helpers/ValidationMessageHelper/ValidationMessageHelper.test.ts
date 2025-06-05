import { getMessageForProperty } from "./ValidationMessageHelper.ts";

import { ExtendedValidationMessage } from "../../Validators/PartyModelValidator/PartyModelValidator.ts";
import { MessageType } from "../../ClientApi";

describe("getMessageForProperty", () => {
  // Mock validation messages
  const validationMessages: ExtendedValidationMessage[] = [
    {
      field: "name",
      type: MessageType.Error,
      message: "Name is required.",
    },
    {
      field: "size",
      type: MessageType.Warning,
      message: "Size is not valid.",
    },
  ];

  it("returns the correct message for matching field and type", () => {
    const result = getMessageForProperty("name", validationMessages, MessageType.Error);
    expect(result).toBe("Name is required.");
  });

  it("returns undefined when no matching message is found", () => {
    const result = getMessageForProperty("age", validationMessages, MessageType.Error);
    expect(result).toBeUndefined();
  });

  it("returns undefined when the validationMessages array is empty", () => {
    const result = getMessageForProperty("name", [], MessageType.Error);
    expect(result).toBeUndefined();
  });

  it("returns the first match when multiple matches exist", () => {
    const customValidationMessages: ExtendedValidationMessage[] = [
      {
        field: "name",
        type: MessageType.Error,
        message: "Name error.",
      },
      {
        field: "name",
        type: MessageType.Error,
        message: "Name not error.",
      },
    ];
    const result = getMessageForProperty("name", customValidationMessages, MessageType.Error);
    expect(result).toBe("Name error.");
  });
});
