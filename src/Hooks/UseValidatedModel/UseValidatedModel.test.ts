import { renderHook } from "@testing-library/react";
import useValidatedModel from "./useValidatedModel";
import { PartyDto } from "../../ClientApi";

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
