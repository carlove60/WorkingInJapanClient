import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FieldComponent from "./FieldComponent";

describe("FieldComponent", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    label: "Test Label",
    value: "",
    onChange: mockOnChange,
    placeHolder: "Enter text",
    type: "text" as const,
    errorMessage: "",
    disabled: false,
    sx: {},
  };

  const renderFieldComponent = (overrides = {}) => {
    const props = { ...defaultProps, ...overrides };
    return render(<FieldComponent {...props} />);
  };

  it("renders without crashing", () => {
    renderFieldComponent();
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("disables the input when disabled is set to true", () => {
    renderFieldComponent({ disabled: true });
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement).toBeDisabled();
  });

  it("displays an error message when errorMessage is provided", () => {
    renderFieldComponent({ errorMessage: "This is an error" });

    expect(screen.getByText("This is an error")).toBeInTheDocument();
  });

  it("renders with the correct initial value", () => {
    renderFieldComponent({ value: "Initial Value" });
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("Initial Value");
  });

  it("updates value when props change", () => {
    const { rerender } = render(<FieldComponent {...defaultProps} value="Initial Value" />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("Initial Value");
    rerender(<FieldComponent {...defaultProps} value="Updated Value" />);
    expect(inputElement.value).toBe("Updated Value");
  });

  it("renders the placeholder text", () => {
    renderFieldComponent({ placeHolder: "Test Placeholder" });

    const inputElement = screen.getByPlaceholderText("Test Placeholder");
    expect(inputElement).toBeInTheDocument();
  });
});
