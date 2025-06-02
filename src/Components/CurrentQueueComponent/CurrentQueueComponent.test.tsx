import { render, screen } from "@testing-library/react";
import CurrentQueueComponent from "./CurrentQueueComponent";
import "@testing-library/jest-dom";

describe("CurrentQueueComponent", () => {
  it("renders correctly with an empty list of parties", () => {
    render(<CurrentQueueComponent parties={undefined} />);

    // Check if the component renders a message or remains empty
    expect(screen.queryByText(/waiting list/i)).not.toBeInTheDocument();
  });

  it("renders the parties when provided", () => {
    const mockParties = [
      { id: 1, name: "John Doe", size: 4, listName: "List 1" },
      { id: 2, name: "Jane Smith", size: 2, listName: "List 2" },
    ];
    render(<CurrentQueueComponent parties={mockParties} />);

    // Check that the names, sizes, and list names are displayed
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
  });

  it("does not render when parties list is undefined", () => {
    render(<CurrentQueueComponent parties={undefined} />);

    // Ensure the component does not display when no data is provided
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Waiting List")).not.toBeInTheDocument();
  });
});
