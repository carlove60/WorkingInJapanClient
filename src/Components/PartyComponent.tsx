import { PartyDto, ValidationMessage } from "../ClientApi";
import ButtonComponent from "./Shared/ButtonComponent.tsx";
import * as React from "react";
import { CheckIn } from "../ClientApi/ClientApi.ts";
import ErrorComponent from "./Error/ErrorComponent.tsx";
interface Props {
  party: PartyDto;
  isLoading: boolean;
}

const PartyComponent = ({ party, isLoading }: Props) => {
  const [messages, setMessages] = React.useState<ValidationMessage[] | undefined>();
  const [disabled, setDisabled] = React.useState(true);
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);

  const onCheckInClick = async () => {
    setDisabled(true);
    const response = await CheckIn();
    setDisabled(false);
    setMessages(response.messages);
    if (response.success) {
      setIsCheckedIn(true);
    } else {
      setIsCheckedIn(false);
    }
  };

  const getCheckInButton = () => {
    if (!party?.canCheckIn) {
      return null;
    }
    return (
      <ButtonComponent
        text={"Click here to check in!"}
        onPress={onCheckInClick}
        disabled={!party.canCheckIn || disabled || isLoading}
      />
    );
  };
  return (
    <>
      <ErrorComponent messages={messages} onClose={() => setMessages(undefined)} />
      {isCheckedIn ? (
        <div></div>
      ) : (
        <div>
          <div>Hey! {party?.name}, thank you for joining the waiting list.</div>
          <div>A check-in button will appear as soon as you can check-in!</div>
          {getCheckInButton()}
        </div>
      )}
    </>
  );
};

export default PartyComponent;
