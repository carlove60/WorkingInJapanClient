import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddToWaitingListComponent, { Props } from "./AddToWaitingListComponent";

// Mock the ClientApi
jest.mock("../../ClientApi/ClientApi", () => ({
  ClientApi: {
    addToWaitingList: jest.fn(),
  },
}));
// Default props with all required properties
const mockOnSignUp = () => {};
const mockSetMessages = jest.fn();
const defaultProps = {
  parties: [],
  seatsAvailable: 10,
  waitingListName: "Test Waiting List",
  onSignUp: mockOnSignUp,
  setMessages: mockSetMessages,
  messages: [],
};

describe("AddToWaitingListComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(<AddToWaitingListComponent {...defaultProps} />);

    // Check for the form elements
    expect(screen.getByText(/add to waiting list/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/party size/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join the waiting list/i })).toBeInTheDocument();

    // Check that waiting list name is displayed
    expect(screen.getByText(/Test Waiting List/i)).toBeInTheDocument();

    // Check that seats available info is displayed
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<AddToWaitingListComponent {...defaultProps} />);

    // Find the submit button and click it without filling any fields
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Check that setMessages was called with validation errors
    expect(mockSetMessages).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringMatching(/name is required/i),
          type: "error",
        }),
        expect.objectContaining({
          message: expect.stringMatching(/party size is required/i),
          type: "error",
        }),
      ]),
    );
  });

  it("submits the form with valid data", async () => {
    render(<AddToWaitingListComponent {...defaultProps} />);

    // Fill out the form fields
    const nameInput = screen.getByLabelText(/name/i);
    const partySize = screen.getByLabelText(/party size|number of guests/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(partySize, "4");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Verify onSignUp was called with correct data
    expect(mockOnSignUp).toHaveBeenCalledWith({
      name: "John Doe",
      partySize: 4,
    });

    // Check that success message was set
    expect(mockSetMessages).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringMatching(/successfully added to waiting list/i),
          type: "success",
        }),
      ]),
    );
  });

  it("shows error message when API call fails", async () => {
    // Set up props to simulate an error condition
    const errorProps = {
      ...defaultProps,
      onSignUp: jest.fn().mockImplementation(() => {
        throw new Error("Failed to add to waiting list");
      }),
    };

    render(<AddToWaitingListComponent {...errorProps} />);

    // Fill out the form fields
    const nameInput = screen.getByLabelText(/name/i);
    const partySize = screen.getByLabelText(/party size|number of guests/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(partySize, "4");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Check that error message was set
    expect(mockSetMessages).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringMatching(/failed to add to waiting list/i),
          type: "error",
        }),
      ]),
    );
  });

  it("resets form after successful submission", async () => {
    render(<AddToWaitingListComponent {...defaultProps} />);

    // Fill out the form fields
    const nameInput = screen.getByLabelText(/name/i);
    const partySize = screen.getByLabelText(/party size|number of guests/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(partySize, "4");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Verify form was reset
    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(partySize).toHaveValue("");
    });
  });

  it("validates party size is a positive number", async () => {
    render(<AddToWaitingListComponent {...defaultProps} />);

    // Fill name but enter invalid party size
    const nameInput = screen.getByLabelText(/name/i);
    const partySize = screen.getByLabelText(/party size|number of guests/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(partySize, "-1");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Check that validation message was set
    expect(mockSetMessages).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringMatching(/party size must be a positive number/i),
          type: "error",
        }),
      ]),
    );
  });

  it("disables submit button while submitting", async () => {
    // Create a version of onSignUp that has a delay
    const delayedOnSignUp = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), 100);
      });
    });

    const propsWithDelay = {
      ...defaultProps,
      onSignUp: delayedOnSignUp,
    };

    render(<AddToWaitingListComponent {...propsWithDelay} />);

    // Fill out the form fields
    const nameInput = screen.getByLabelText(/name/i);
    const partySize = screen.getByLabelText(/party size|number of guests/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(partySize, "3");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Check button is disabled during submission
    expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("handles special characters in name input correctly", async () => {
    render(<AddToWaitingListComponent {...defaultProps} />);

    // Fill out the form fields with special characters
    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, "O'Connor-Smith");
    await userEvent.type(screen.getByLabelText(/party size|number of guests/i), "2");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /join the waiting list/i });
    fireEvent.click(submitButton);

    // Verify onSignUp was called with correctly formatted data
    expect(mockOnSignUp).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "O'Connor-Smith",
        partySize: 2,
      }),
    );
  });

  it("displays existing parties in the waiting list", () => {
    const propsWithParties: Props = {
      ...defaultProps,
      parties: [
        { name: "Smith Family", size: 4 },
        { name: "Johnson Group", size: 2 },
      ],
    };

    render(<AddToWaitingListComponent {...propsWithParties} />);

    // Check that parties are displayed
    expect(screen.getByText("Smith Family")).toBeInTheDocument();
    expect(screen.getByText("Johnson Group")).toBeInTheDocument();
  });

  it("displays provided messages", () => {
    const propsWithMessages: Props = {
      ...defaultProps,
      messages: [
        { message: "This is an error message", type: "error" },
        { message: "This is a success message", type: "success" },
      ],
    };

    render(<AddToWaitingListComponent {...propsWithMessages} />);

    // Check that messages are displayed
    expect(screen.getByText("This is an error message")).toBeInTheDocument();
    expect(screen.getByText("This is a success message")).toBeInTheDocument();
  });

  it("handles undefined props gracefully", () => {
    const minimalProps: Props = {
      parties: undefined,
      seatsAvailable: undefined,
      waitingListName: undefined,
      onSignUp: mockOnSignUp,
      setMessages: mockSetMessages,
      messages: [],
    };

    // This should not throw any errors
    render(<AddToWaitingListComponent {...minimalProps} />);

    // Component should still be functional
    expect(screen.getByRole("button", { name: /join the waiting list/i })).toBeInTheDocument();
  });
});
