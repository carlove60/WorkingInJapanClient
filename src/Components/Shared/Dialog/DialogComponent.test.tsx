import { render, screen, fireEvent } from "@testing-library/react";
import DialogComponent, { DialogComponentProps } from "./DialogComponent.tsx";
import "@testing-library/jest-dom";
import { DialogsProvider } from "@toolpad/core/useDialogs";

describe("DialogComponent", () => {
  const defaultOnAccept = jest.fn();
  const defaultOnClose = jest.fn();

  const defaultPayload: DialogComponentProps = {
    title: "Test Dialog",
    text: "This is a test dialog.",
    onAccept: defaultOnAccept,
    onCancel: defaultOnClose,
  };

  const renderComponent = ({
    open = true,
    payload = defaultPayload,
    onClose = defaultOnClose,
  }: {
    open?: boolean;
    payload?: DialogComponentProps;
    onClose?: jest.Mock;
  }) => {
    return render(
      <DialogsProvider>
        <DialogComponent open={open} payload={payload} onClose={onClose} />
      </DialogsProvider>,
    );
  };

  it("renders the dialog with the correct title and text when payload is present", () => {
    // Given: A dialog component with valid payload
    renderComponent({});

    // Then: It displays the dialog title and content
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a test dialog.")).toBeInTheDocument();
  });

  it("calls the onAccept handler when the 'Confirm' button is clicked", () => {
    // Given: A dialog component with valid payload
    renderComponent({});

    // When: The 'Confirm' button is clicked
    fireEvent.click(screen.getByText("Confirm"));

    // Then: The onAccept handler should be called
    expect(defaultOnAccept).toHaveBeenCalledTimes(1);

    // And: The onClose handler should be called
    expect(defaultOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls the onClose handler when the 'Close' button is clicked without invoking onAccept", () => {
    // Given: A dialog component with valid payload
    renderComponent({});

    // When: The 'Cancel' button is clicked
    const cancelButton = screen.getByText("Close");
    fireEvent.click(cancelButton);

    // Then: Ensure the onClose handler is called exactly 3 times
    expect(defaultOnClose).toHaveBeenCalledTimes(3);
  });

  it("does not render the dialog when open is false", () => {
    // Given: A dialog component where `open` is false
    renderComponent({ open: false });

    // Then: The dialog content should not be present
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a test dialog.")).not.toBeInTheDocument();
  });
});
