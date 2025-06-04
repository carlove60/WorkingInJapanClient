import { render, screen } from "@testing-library/react";
import PartyComponent from "./PartyComponent";
import "@testing-library/jest-dom";
import { DialogsProvider } from "@toolpad/core/useDialogs";

const mockSetMessages = jest.fn();

jest.mock("../../ClientApi/ClientApi", () => ({
  ...jest.requireActual("../../ClientApi/ClientApi"), // Include other exports
  CheckIn: jest.fn(), // Mock the CheckIn function
}));

describe("PartyComponent", () => {
  it("should show checked in text when checkedIn is true", () => {
    render(
      <DialogsProvider>
        <PartyComponent
          party={{
            name: "Carlo",
            size: 10,
            waitingListName: "Waiting List A",
            checkedIn: true,
            canCheckIn: false,
          }}
          setMessages={mockSetMessages}
        />
      </DialogsProvider>,
    );

    expect(screen.getByText("Checked in!")).toBeInTheDocument();
    expect(screen.queryByText("Click here to check in!")).not.toBeInTheDocument();
  });

  it("should show a check-in button soon text when checkedIn is false and canCheckIn is false", () => {
    render(
      <DialogsProvider>
        <PartyComponent
          party={{
            name: "Carlo",
            size: 10,
            waitingListName: "Waiting List A",
            checkedIn: false,
            canCheckIn: false,
          }}
          setMessages={mockSetMessages}
        />
      </DialogsProvider>,
    );

    expect(screen.getByText("A check-in button will appear as soon as you can check-in!")).toBeInTheDocument();
    expect(screen.queryByText("Click here to check in!")).not.toBeInTheDocument();
  });

  it("should show click to check-in button when checkedIn is false and canCheckIn is true", () => {
    render(
      <DialogsProvider>
        <PartyComponent
          party={{
            name: "Carlo",
            size: 10,
            waitingListName: "Waiting List A",
            checkedIn: false,
            canCheckIn: true,
          }}
          setMessages={mockSetMessages}
        />
      </DialogsProvider>,
    );

    expect(screen.getByText("Click here to check in!")).toBeInTheDocument();
    expect(screen.queryByText("A check-in button will appear as soon as you can check-in!")).not.toBeInTheDocument();
  });
});
