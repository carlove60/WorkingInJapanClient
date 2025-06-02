import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddToWaitingListComponent from "./AddToWaitingListComponent";
import "@testing-library/jest-dom";

// Mock the ClientApi
jest.mock("../../ClientApi/ClientApi", () => ({
  ClientApi: {
    addToWaitingList: jest.fn(),
  },
}));
// Default props with all required properties
const mockOnSignUp = jest.fn();
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
    expect(screen.getByText(/Join the Waitlist/i, { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Please enter the name of your party", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Size\s*\*/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Join the waiting list/i })).toBeInTheDocument();

    // Check that seats available info is displayed
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  // Test disabled button when seatsAvailable is 0
  it("disables the submit button when no seats are available", () => {
    render(<AddToWaitingListComponent {...defaultProps} seatsAvailable={0} />);

    const submitButton = screen.getAllByRole("button")[0];
    expect(submitButton).toBeDisabled();
  });
});
