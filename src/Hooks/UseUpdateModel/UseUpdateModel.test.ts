import { renderHook, act } from "@testing-library/react";
import useUpdateModel from "./useUpdateModel"; // Adjust path as necessary
import { isNotNullOrEmpty } from "../../Helpers/StringHelper/StringHelper.ts"; // Mocked helper function

jest.mock("../../Helpers/StringHelper/StringHelper.ts", () => ({
  isNotNullOrEmpty: jest.fn(),
}));

describe("useUpdateModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes the model with the given initial value", () => {
    const initialValue = { name: "John", age: 30 };
    const { result } = renderHook(() => useUpdateModel(initialValue));

    expect(result.current.model).toEqual(initialValue); // Initial state check
  });

  it("updates the model when called with a valid key and value", () => {
    // Mock the helper function to always return true
    (isNotNullOrEmpty as jest.Mock).mockReturnValue(true);

    const initialValue = { name: "John", age: 30 };
    const { result } = renderHook(() => useUpdateModel(initialValue));

    act(() => {
      result.current.updateModel("name", "Doe");
    });

    expect(result.current.model).toEqual({ name: "Doe", age: 30 }); // Ensure the state is updated correctly
  });

  it("overwrites the value of a key in the model", () => {
    (isNotNullOrEmpty as jest.Mock).mockReturnValue(true); // Key is valid

    const initialValue = { name: "John", age: 30 };
    const { result } = renderHook(() => useUpdateModel(initialValue));

    act(() => {
      result.current.updateModel("age", 35);
    });

    expect(result.current.model).toEqual({ name: "John", age: 35 }); // Overwritten value
  });
});
