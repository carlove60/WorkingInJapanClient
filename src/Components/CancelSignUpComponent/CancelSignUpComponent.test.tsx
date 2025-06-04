import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CancelSignUpComponent from "./CancelSignUpComponent.tsx";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import { CancelCheckIn } from "../../ClientApi/ClientApi.ts";
import "@testing-library/jest-dom";

// Mock the useDialogs hook
jest.mock("@toolpad/core/esm/useDialogs", () => ({
  useDialogs: () => ({
    open: jest.fn(() => Promise.resolve()),
  }),
}));

jest.mock("../../ClientApi/ClientApi", () => ({
  CancelCheckIn: jest.fn(), // Mock the CancelCheckIn function
}));

describe("CancelSignUpComponent", () => {
  const mockOnCancellation = jest.fn();
  const mockSetBusy = jest.fn();
  const mockOpen = jest.fn();

  beforeEach(() => {
    (CancelCheckIn as jest.Mock).mockReset(); // Ensure no residue between tests
  });

  it("disables the button and opens the dialog on cancel button click", async () => {
    render(
      <DialogsProvider>
        <CancelSignUpComponent disabled={false} onCancellation={mockOnCancellation} setBusy={mockSetBusy} />
      </DialogsProvider>,
    );
    const clickToCancel = screen.getByText("Click here to cancel");
    fireEvent.click(clickToCancel);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockSetBusy).toHaveBeenCalledWith(true);
  });

  it("handles dialog confirm and processes cancellation", async () => {
    mockOpen.mockImplementation(async (_DialogComponent, { onAccept }) => {
      await onAccept(); // Simulate dialog confirmation
    });

    render(
      <DialogsProvider>
        <CancelSignUpComponent disabled={false} onCancellation={mockOnCancellation} setBusy={mockSetBusy} />
      </DialogsProvider>,
    );

    const cancelButton = screen.getByText("Click here to cancel");
    fireEvent.click(cancelButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(CancelCheckIn).toHaveBeenCalled();
    });
  });

  it("handles dialog cancellation and resets state", async () => {
    mockOpen.mockImplementation(async (_DialogComponent, { onCancel }) => {
      onCancel(); // Simulate dialog cancellation
    });

    render(
      <DialogsProvider>
        <CancelSignUpComponent disabled={false} onCancellation={mockOnCancellation} setBusy={mockSetBusy} />
      </DialogsProvider>,
    );

    const cancelButton = screen.getByText("Click here to cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockSetBusy).toHaveBeenCalledWith(true);
    });
  });
});
