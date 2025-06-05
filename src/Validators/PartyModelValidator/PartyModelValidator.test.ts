// validatePartyDto.test.ts
import { MessageType } from "../../ClientApi";
import { ExtendedValidationMessage, PartyDtoValidatorModel, validatePartyDto } from "./PartyModelValidator.ts";

describe("validatePartyDto", () => {
  it("should return an empty array when the model is undefined", () => {
    const result = validatePartyDto(undefined);
    expect(result).toEqual([]);
  });

  it("should validate when the party name is missing", () => {
    const model: PartyDtoValidatorModel = {
      party: { name: "", size: 5 },
      seatsAvailable: 10,
    };

    const result = validatePartyDto(model);
    const expected: ExtendedValidationMessage[] = [
      {
        type: MessageType.Error,
        message: "Please enter the name of your party",
        field: "name",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("should validate when the party size is not numeric", () => {
    const model: PartyDtoValidatorModel = {
      party: { name: "My Party", size: NaN },
      seatsAvailable: 10,
    };

    const result = validatePartyDto(model);
    const expected: ExtendedValidationMessage[] = [
      {
        type: MessageType.Error,
        message: "Please enter the size of your party",
        field: "size",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("should validate when the party size is less than 1", () => {
    const model: PartyDtoValidatorModel = {
      party: { name: "My Party", size: 0 },
      seatsAvailable: 10,
    };

    const result = validatePartyDto(model);
    const expected: ExtendedValidationMessage[] = [
      {
        type: MessageType.Error,
        message: "Your party must be at least be 1 person",
        field: "size",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("should validate when party size exceeds seats available", () => {
    const model: PartyDtoValidatorModel = {
      party: { name: "My Party", size: 15 },
      seatsAvailable: 10,
    };

    const result = validatePartyDto(model);
    const expected: ExtendedValidationMessage[] = [
      {
        message: "Your party size of 15 is larger than the total of 10 seats available",
        type: "error",
        field: "size",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("should return multiple validation messages if multiple validations fail", () => {
    const model: PartyDtoValidatorModel = {
      party: { name: "", size: 0 },
      seatsAvailable: 10,
    };

    const result = validatePartyDto(model);
    const expected: ExtendedValidationMessage[] = [
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
    ];
    expect(result).toEqual(expected);
  });

  it("should validate successfully with no errors if data is valid", () => {
    const model: PartyDtoValidatorModel = {
      party: { name: "Valid Party", size: 5 },
      seatsAvailable: 10,
    };

    const result = validatePartyDto(model);
    expect(result).toEqual([]);
  });
});
