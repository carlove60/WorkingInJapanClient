import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ValidationMessage } from "../../ClientApi";
import { CancelCheckIn } from "../../ClientApi/ClientApi.ts";
import ButtonComponent from "../Shared/ButtonComponent/ButtonComponent.tsx";
import { useDialogs } from "@toolpad/core/useDialogs";
import DialogComponent, { DialogComponentProps } from "../Shared/Dialog/DialogComponent.tsx";
import * as React from "react";

interface CancelSignUpProps {
  onCancellation: (messages: ValidationMessage[]) => void;
  disabled: boolean;
  setBusy: (busy: boolean) => void;
}

const CancelSignUpComponent = ({ disabled, onCancellation, setBusy }: CancelSignUpProps) => {
  const dialogs = useDialogs();
  const [cancelDisabled, setDisabled] = React.useState(false);
  const areYouSureText = "Are you sure you want to cancel your spot on the waiting list?";

  const onConfirmCancel = async () => {
    const cancellationResult = await CancelCheckIn();
    onCancellation(cancellationResult?.messages);
  };

  const onCancelCancel = () => {
    setBusy(false);
    setDisabled(false);
  };

  const dialogProps: DialogComponentProps = {
    text: areYouSureText,
    title: "Cancel Sign Up",
    onAccept: onConfirmCancel,
    onCancel: onCancelCancel,
  };

  const onCancelSignUp = async () => {
    setDisabled(true);
    setBusy(true);
    await dialogs.open(DialogComponent, dialogProps);
  };

  return (
    <Box style={{ paddingTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        Cancel your spot?
      </Typography>
      <ButtonComponent disabled={disabled || cancelDisabled} text={"Click here to cancel"} onPress={onCancelSignUp} />
    </Box>
  );
};

export default CancelSignUpComponent;
