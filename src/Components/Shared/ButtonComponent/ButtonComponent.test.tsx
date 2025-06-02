import { render, screen, fireEvent } from "@testing-library/react";
import ButtonComponent from "./ButtonComponent.tsx";
import "@testing-library/jest-dom";

describe("buttonComponent", () => {
  const mockOnPress = jest.fn();

  const defaultProps = {
    text: "Click Me",
    onPress: mockOnPress,
    disabled: false,
  };

  const renderButtonComponent = (overrides = {}) => {
    const props = { ...defaultProps, ...overrides };
    return render(<ButtonComponent {...props} />);
  };

  it("renders correctly with the given text", () => {
    renderButtonComponent();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onPress when clicked", () => {
    renderButtonComponent();

    const buttonElement = screen.getByRole("button", { name: "Click Me" });

    // Simulate a click event
    fireEvent.click(buttonElement);

    // Assert that the onPress handler was called
    expect(mockOnPress).toBeCalledTimes(1);
  });

  it("renders the button as disabled when disabled prop is true", () => {
    renderButtonComponent({ disabled: true });

    const buttonElement = screen.getByRole("button", { name: "Click Me" });

    // Assert that the button is disabled
    expect(buttonElement).toBeDisabled();
  });

  it("should not be disabled", () => {
    render(
      <>
        <ButtonComponent onPress={() => {}} text="Click Me" disabled={false} />
      </>,
    );

    const buttons = screen.getAllByRole("button", { name: "Click Me" });
    expect(buttons[0]).not.toBeDisabled(); // Test the first button
  });
});
