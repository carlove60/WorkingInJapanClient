import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import * as ClientApi from "../../ClientApi/ClientApi";
import { usePolling } from "../../Hooks/UsePolling/usePolling.ts";
import { PartyDto, ValidationMessage, WaitingListDto } from "../../ClientApi";
import MessageComponent from "../../Components/Error/MessageComponent.tsx";
import WaitingListComponent from "./WaitingListComponent.tsx"; // Mocked API calls
import "@testing-library/jest-dom";

const mockParty = {
  sessionId: "123",
  name: "John Doe",
  canCheckIn: true,
  checkedIn: false,
} as PartyDto;

const mockWaitingList = {
  name: "Test List",
  parties: [
    { name: "Party 1", size: 2 },
    { name: "Party 2", size: 3 },
  ],
  seatsAvailable: 10,
} as WaitingListDto;

const mockValidationMessages = [
  { message: "Error occurred", type: "error" },
  { message: "Successfully added", type: "success" },
] as ValidationMessage[];

jest.mock("../../Hooks/UsePolling/usePolling.ts", () => ({
  usePolling: jest.fn(),
}));

jest.mock("../../ClientApi/ClientApi", () => ({
  GetParty: jest.fn(),
  GetWaitingList: jest.fn(() => {
    return { waitingList: mockWaitingList };
  }),
}));

// Mock the polling behavior (disable periodic calls during tests)
(usePolling as jest.Mock).mockImplementation((callback: () => void, enabled: boolean) => {
  if (enabled) {
    callback();
  }
});
describe("WaitingListComponent", () => {
  test("renders loading state when party is undefined", async () => {
    (ClientApi.GetParty as jest.Mock).mockResolvedValue({ party: undefined });

    render(<WaitingListComponent />);

    expect(screen.getByText("少々お待ちください。。。")).toBeInTheDocument();
  });

  test("renders PartyComponent when party.sessionId exists", async () => {
    (ClientApi.GetParty as jest.Mock).mockResolvedValue({ party: mockParty });

    render(<WaitingListComponent />);

    await waitFor(() => {
      expect(screen.getByText(`${mockParty.name}, you can check-in now!`)).toBeInTheDocument();
    });
  });

  test("renders AddToWaitingListComponent when party has no sessionId", async () => {
    (ClientApi.GetParty as jest.Mock).mockResolvedValue({ party: { ...mockParty, sessionId: "" } });
    (ClientApi.GetWaitingList as jest.Mock).mockResolvedValue({ waitingList: mockWaitingList });

    render(<WaitingListComponent />);

    await waitFor(() => {
      expect(screen.getByText("Join the Waitlist")).toBeInTheDocument();
      expect(screen.getByText(`Total seats available: ${mockWaitingList.seatsAvailable}`)).toBeInTheDocument();
    });
  });

  test("displays validation messages", async () => {
    (ClientApi.GetParty as jest.Mock).mockResolvedValue({ party: undefined });

    render(<WaitingListComponent />);

    // Simulate adding validation messages
    act(() => {
      render(<MessageComponent messages={mockValidationMessages} onClose={jest.fn()} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
      expect(screen.getByText("Successfully added")).toBeInTheDocument();
    });
  });
});
