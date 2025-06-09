import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import * as ClientApi from "../../ClientApi/ClientApi";
import { PartyDto, ValidationMessage, WaitingListDto } from "../../ClientApi";
import MessageComponent from "../../Components/Error/MessageComponent.tsx";
import WaitingListComponent from "./WaitingListComponent.tsx";
import "@testing-library/jest-dom";
import Paths from "../../Constants/Paths.ts";
import { EventSourceHandler, useEventSource } from "../../Hooks/UseEventSource/useEventSource.ts";

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

jest.mock("../../ClientApi/ClientApi", () => ({
  GetParty: jest.fn(() => {
    return undefined;
  }),
  GetWaitingList: jest.fn(() => {
    return { waitingList: mockWaitingList };
  }),
}));

jest.mock("@toolpad/core/useDialogs", () => ({
  useDialogs: jest.fn(),
}));

const mEventSourceInstance = {
  onmessage: jest.fn(),
  close: jest.fn(),
  get onMessage() {
    return this.onmessage;
  },
  set onMessage(value) {
    this.onmessage = value;
  },
};
const MockEventSource = jest.fn().mockImplementation(() => mEventSourceInstance);
global.EventSource = MockEventSource as unknown as typeof EventSource;

jest.mock("../../Hooks/UseEventSource/useEventSource.ts", () => ({
  useEventSource: jest.fn(),
}));

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
    (useEventSource as jest.Mock).mockImplementation((eventSources: EventSourceHandler[]) => {
      // Simulate the behavior of EventSource
      eventSources.forEach((eventSource) => {
        // Simulate the `onMessage` callback directly
        if (eventSource.url === Paths.SseMonitorWaitingList) {
          console.log("onMessage", eventSource);
          act(() => {
            eventSource.onMessage({
              data: JSON.stringify({
                messages: [],
                waitingList: { seatsAvailable: 10, name: "Test Waiting List", parties: [] },
              }),
            } as MessageEvent);
          });
        }
      });
    });

    render(<WaitingListComponent />);

    await waitFor(() => {
      expect(screen.getByText("Join the Waitlist")).toBeInTheDocument();
      expect(screen.getByText(`Total seats available: ${mockWaitingList.seatsAvailable}`)).toBeInTheDocument();
    });
  });

  test("displays validation messages", async () => {
    // Simulate adding validation messages
    act(() => {
      render(<MessageComponent messages={mockValidationMessages} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
      expect(screen.getByText("Successfully added")).toBeInTheDocument();
    });
  });
});
