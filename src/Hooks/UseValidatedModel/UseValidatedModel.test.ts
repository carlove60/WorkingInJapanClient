import { renderHook, act } from "@testing-library/react";
import useValidatedModel from "./useValidatedModel";
import { MessageType, PartyDto } from "../../ClientApi";
import {
  ExtendedValidationMessage,
  validatePartyDto,
} from "../../Validators/PartyModelValidator/PartyModelValidator.ts";

jest.mock("../../Validators/PartyModelValidator/PartyModelValidator.ts", () => ({
  ...jest.requireActual("../../Validators/PartyModelValidator/PartyModelValidator.ts"),
  validatePartyDto: jest.fn(),
}));

describe("useValidatedModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with an empty array of validation messages", () => {
    const mockValidate = jest.fn(() => []);
    const initialModel: PartyDto = undefined as unknown as PartyDto;

    const { result } = renderHook(() => useValidatedModel(initialModel, mockValidate));

    expect(result.current.validationMessages).toEqual([]);
    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(initialModel);
  });

  it("updates validation messages when the model is valid", () => {
    const mockValidate = jest.fn(() => []);
    const initialModel: PartyDto = { name: "Party Name", size: 5 };

    const { result, rerender } = renderHook(({ model }) => useValidatedModel(model, mockValidate), {
      initialProps: { model: initialModel },
    });

    expect(result.current.validationMessages).toEqual([]);
    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(initialModel);

    const updatedModel: PartyDto = { name: "Another Name", size: 10 };
    rerender({ model: updatedModel });

    expect(mockValidate).toHaveBeenCalledTimes(2);
    expect(mockValidate).toHaveBeenCalledWith(updatedModel);
    expect(result.current.validationMessages).toEqual([]); // Still no validation messages (valid data)
  });

  it("returns validation messages for an invalid model", () => {
    const invalidModel: PartyDto = { name: "", size: 0 };
    const validationMessages: ExtendedValidationMessage[] = [
      {
        validationMessage: {
          type: MessageType.Error,
          message: "Please enter the name of your party",
        },
        field: "name",
      },
      {
        validationMessage: {
          type: MessageType.Error,
          message: "Your party must be at least be 1 person",
        },
        field: "size",
      },
    ];

    (validatePartyDto as jest.Mock).mockReturnValue(validationMessages);

    const { result } = renderHook(() => useValidatedModel(invalidModel, validatePartyDto));

    expect(result.current.validationMessages).toEqual(validationMessages);
    expect(validatePartyDto).toHaveBeenCalledTimes(1);
    expect(validatePartyDto).toHaveBeenCalledWith(invalidModel);
  });

  it("recalculates validation messages when the model changes to invalid", () => {
    const validModel: PartyDto = { name: "Valid Party", size: 5 };
    const invalidModel: PartyDto = { name: "", size: 0 };

    const validationMessages: ExtendedValidationMessage[] = [
      {
        validationMessage: {
          type: MessageType.Error,
          message: "Please enter the name of your party",
        },
        field: "name",
      },
      {
        validationMessage: {
          type: MessageType.Error,
          message: "Your party must be at least be 1 person",
        },
        field: "size",
      },
    ];

    (validatePartyDto as jest.Mock)
      .mockReturnValueOnce([]) // First validation with valid model
      .mockReturnValueOnce(validationMessages); // Second validation with invalid model

    const { result, rerender } = renderHook(({ model }) => useValidatedModel(model, validatePartyDto), {
      initialProps: { model: validModel },
    });

    expect(result.current.validationMessages).toEqual([]);
    expect(validatePartyDto).toHaveBeenCalledTimes(1);
    expect(validatePartyDto).toHaveBeenCalledWith(validModel);

    act(() => {
      rerender({ model: invalidModel });
    });

    expect(result.current.validationMessages).toEqual(validationMessages);
    expect(validatePartyDto).toHaveBeenCalledTimes(2);
    expect(validatePartyDto).toHaveBeenCalledWith(invalidModel);
  });

  it("does not re-run validation if neither model nor validate function changes", () => {
    const mockValidate = jest.fn(() => []);
    const initialModel: PartyDto = { name: "Persistent Party", size: 4 };

    const { result, rerender } = renderHook(({ model, validate }) => useValidatedModel(model, validate), {
      initialProps: { model: initialModel, validate: mockValidate },
    });

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(result.current.validationMessages).toEqual([]);

    rerender({ model: initialModel, validate: mockValidate }); // Same props

    expect(mockValidate).toHaveBeenCalledTimes(1); // `validate` was not called again
    expect(result.current.validationMessages).toEqual([]);
  });
});
