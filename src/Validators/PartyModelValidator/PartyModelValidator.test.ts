import { MessageType } from "../../ClientApi";
import { PartyDto } from "../../ClientApi";
import { validatePartyDto } from "./PartyModelValidator";

describe("validatePartyDto", () => {
  it("returns an empty array when the model is undefined", () => {
    const validationMessages = validatePartyDto(undefined);
    expect(validationMessages).toEqual([]);
  });

  it("returns an empty array when the model is null", () => {
    const validationMessages = validatePartyDto(null as unknown as PartyDto);
    expect(validationMessages).toEqual([]);
  });

  it("returns a validation message for an empty name field", () => {
    const model: PartyDto = { name: "", size: 5 };
    const validationMessages = validatePartyDto(model);

    expect(validationMessages).toHaveLength(1);
    expect(validationMessages[0]).toEqual({
      type: MessageType.Error,
      message: "Please enter the name of your party",
      field: "name",
    });
  });

  it("returns a validation message when the 'size' field is not numeric", () => {
    const model: PartyDto = { name: "Test Party", size: NaN };
    const validationMessages = validatePartyDto(model);

    expect(validationMessages).toHaveLength(1);
    expect(validationMessages[0]).toEqual({
      type: MessageType.Error,
      message: "Please enter the size of your party",
      field: "size",
    });
  });

  it("returns a validation message when the size is less than 1", () => {
    const model: PartyDto = { name: "Test Party", size: 0 };
    const validationMessages = validatePartyDto(model);

    expect(validationMessages).toHaveLength(1);
    expect(validationMessages[0]).toEqual({
      type: MessageType.Error,
      message: "Your party must be at least be 1 person",
      field: "size",
    });
  });

  it("returns no validation messages for a valid PartyDto model", () => {
    const model: PartyDto = { name: "Valid Party", size: 5 };
    const validationMessages = validatePartyDto(model);

    expect(validationMessages).toHaveLength(0);
  });

  it("returns multiple validation messages when there are multiple validation errors", () => {
    const model: PartyDto = { name: "", size: 0 };
    const validationMessages = validatePartyDto(model);

    expect(validationMessages).toHaveLength(2);

    expect(validationMessages).toEqual([
      {
        type: MessageType.Error,
        message: "Please enter the name of your party",
        field: "name",
      },
      {
        type: MessageType.Error,
        message: "Your party must be at least be 1 person",
        field: "size",
      },
    ]);
  });
});
