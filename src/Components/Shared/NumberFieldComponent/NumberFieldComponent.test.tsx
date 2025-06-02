import { render, screen, fireEvent } from "@testing-library/react";
import NumberFieldComponent from "./NumberFieldComponent";
import "@testing-library/jest-dom";
import { SxProps, Theme } from "@mui/material";

describe("NumberFieldComponent", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    onChange: mockOnChange,
    value: undefined,
    label: "Test Label",
    errorMessage: "Test Error",
    type: "number" as const,
    placeHolder: "Test Placeholder",
    disabled: false,
    sx: {} as SxProps<Theme>,
  };

  // Clears any mock function calls before each test
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders without crashing", () => {
    render(<NumberFieldComponent {...defaultProps} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("renders with the correct initial value", () => {
    const value = 42;
    render(<NumberFieldComponent {...defaultProps} value={value} />);

    const inputElement = screen.getByLabelText("Test Label").querySelector("input") as HTMLInputElement;

    expect(inputElement.value).toBe(String(value)); // Input's value is always a string in the DOM
  });

  it("calls onChange with the correct value on user input", () => {
    render(<NumberFieldComponent {...defaultProps} />);

    const inputElement = screen.getByLabelText("Test Label").querySelector("input") as HTMLInputElement;

    // Simulate user typing 123
    fireEvent.change(inputElement, { target: { value: "123" } });

    expect(mockOnChange).toHaveBeenCalledWith(123); // Verify the correct numeric value
  });

  it("displays the error message when provided", () => {
    render(<NumberFieldComponent {...defaultProps} errorMessage="Required field" />);

    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("disables the input when disabled is true", () => {
    render(<NumberFieldComponent {...defaultProps} disabled={true} />);
    const inputElement = screen.getByLabelText("Test Label").querySelector("input") as HTMLInputElement;
    expect(inputElement).toBeDisabled(); // Verify the input is disabled
  });

  it("applies the placeholder correctly", () => {
    render(<NumberFieldComponent {...defaultProps} placeHolder="Enter a number" />);
    expect(screen.getByPlaceholderText("Enter a number")).toBeInTheDocument();
  });

  it("handles empty input correctly", () => {
    render(<NumberFieldComponent {...defaultProps} />);

    const inputElement = screen.getByLabelText("Test Label").querySelector("input") as HTMLInputElement;

    // Simulate user clearing the input field
    fireEvent.change(inputElement, { target: { value: "" } });

    // MUI doesn't react to ""
    expect(mockOnChange).toHaveBeenCalledTimes(0);
  });

  it("applies custom styles via sx prop", () => {
    const customSx = { padding: "10px", margin: "20px" };
    render(<NumberFieldComponent {...defaultProps} sx={customSx} />);
    const inputElement = screen.getByLabelText("Test Label");

    // Even though the `sx` prop is passed to the MUI component internally,
    // we can’t directly assert on it (mui uses runtime CSS-in-JS).
    // Ensure no crashes or invalid style application.
    expect(inputElement).toBeInTheDocument();
  });
});
