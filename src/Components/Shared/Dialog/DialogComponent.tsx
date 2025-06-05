import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DialogProps } from "@toolpad/core/useDialogs";

export interface DialogComponentProps {
  title: string;
  text: string;
  onAccept: () => void;
  onCancel: () => void;
}

function DialogComponent({ open, payload, onClose }: DialogProps<DialogComponentProps>): React.ReactNode {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => {
        payload.onCancel();
        onClose();
      }}
    >
      <DialogTitle>{payload.title}</DialogTitle>
      <DialogContent>{payload.text}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            payload.onAccept();
            onClose();
          }}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            payload.onCancel();
            onClose(undefined);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;
