import { render, screen } from "@testing-library/react";
import PartyComponent from "./PartyComponent";
import "@testing-library/jest-dom";

describe("PartyComponent", () => {
  it("should show checked in text when checkedIn is true", () => {
    render(
      <PartyComponent
        party={{ name: "Carlo", size: 10, waitingListName: "Waiting List A", checkedIn: true, canCheckIn: false }}
        setMessages={jest.fn()}
      />,
    );

    expect(screen.getByText("Checked in!")).toBeInTheDocument();
    expect(screen.queryByText("Click here to check in!")).not.toBeInTheDocument();
  });

  it("should not show a check in button soon text when checkedIn is false and canCheckIn is trye", () => {
    render(
      <PartyComponent
        party={{ name: "Carlo", size: 10, waitingListName: "Waiting List A", checkedIn: false, canCheckIn: false }}
        setMessages={jest.fn()}
      />,
    );
    expect(screen.queryByText("Click here to check in!")).not.toBeInTheDocument();
    expect(screen.getByText("A check-in button will appear as soon as you can check-in!")).toBeInTheDocument();
  });

  it("should show you will see a check in button soon text when checkedIn is false and canCheckIn is true", () => {
    render(
      <PartyComponent
        party={{ name: "Carlo", size: 10, waitingListName: "Waiting List A", checkedIn: false, canCheckIn: true }}
        setMessages={jest.fn()}
      />,
    );
    expect(screen.getByText("Click here to check in!")).toBeInTheDocument();
    expect(screen.queryByText("A check-in button will appear as soon as you can check-in!")).not.toBeInTheDocument();
  });
});
