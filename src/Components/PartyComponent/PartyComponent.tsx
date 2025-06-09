import { PartyDto, ValidationMessage } from "../../ClientApi";
import ButtonComponent from "../Shared/ButtonComponent/ButtonComponent.tsx";
import * as React from "react";
import { CheckIn } from "../../ClientApi/ClientApi.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelSignUpComponent from "../CancelSignUpComponent/CancelSignUpComponent.tsx";

interface Props {
  party: PartyDto;
  setMessages: (message: ValidationMessage[]) => void;
  onCheckIn: (party: PartyDto | undefined) => void;
}

const PartyComponent = ({ party, setMessages, onCheckIn }: Props) => {
  const [disabled, setDisabled] = React.useState(false);

  const isDisabled = () => {
    return !party?.canCheckIn || disabled;
  };

  const onCheckInClick = async () => {
    setDisabled(true);
    const response = await CheckIn();
    onCheckIn(response.party);
    setMessages(response.messages);
  };

  const getCheckInButton = () => {
    if (!party?.canCheckIn) {
      return null;
    }
    return <ButtonComponent text={"Click here to check in!"} onPress={onCheckInClick} disabled={isDisabled()} />;
  };

  const getCheckInText = () => {
    if (party?.canCheckIn) {
      return `${party?.name}, you can check-in now!`;
    }

    return `${party?.name}, you are signed-up!`;
  };

  const onBusy = (value: boolean): void => {
    setDisabled(value);
  };

  return (
    <>
      {party?.checkedIn ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Checked in!
          </Typography>
          <div>Thanks for checking in, please enter the restaurant.</div>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            {getCheckInText()}
          </Typography>
          {!party?.canCheckIn ? <div>A check-in button will appear as soon as you can check-in!</div> : null}
          {getCheckInButton()}
          <CancelSignUpComponent
            setBusy={onBusy}
            disabled={disabled}
            onCancellation={(value) => {
              setMessages(value);
              setDisabled(false);
              onCheckIn({});
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PartyComponent;
