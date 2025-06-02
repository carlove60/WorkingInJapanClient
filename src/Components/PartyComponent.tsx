import { PartyDto, ValidationMessage } from "../ClientApi";
import ButtonComponent from "./Shared/ButtonComponent.tsx";
import * as React from "react";
import ErrorComponent from "./Error/ErrorComponent.tsx";
import { CheckIn } from "../ClientApi/ClientApi.ts";
interface Props {
  party: PartyDto;
}

const PartyComponent = ({ party }: Props) => {
  const [messages, setMessages] = React.useState<ValidationMessage[] | undefined>();
  const [disabled, setDisabled] = React.useState(false);

  const isDisabled = () => {
    return !party?.canCheckIn || disabled;
  };

  const onCheckInClick = async () => {
    setDisabled(true);
    const response = await CheckIn();
    setDisabled(false);
    setMessages(response.messages);
  };

  const getCheckInButton = () => {
    if (!party?.canCheckIn) {
      return null;
    }
    return <ButtonComponent text={"Click here to check in!"} onPress={onCheckInClick} disabled={isDisabled()} />;
  };
  return (
    <>
      <ErrorComponent messages={messages} onClose={() => setMessages(undefined)} />
      {party?.checkedIn ? (
        <div>
          Thanks for checking in, please make your way to our restaurant, we will be expecting you, {party?.name}!
        </div>
      ) : (
        <div>
          <div>Hey {party?.name}! Thank you for joining the waiting list.</div>
          <div>A check-in button will appear as soon as you can check-in!</div>
          {getCheckInButton()}
        </div>
      )}
    </>
  );
};

export default PartyComponent;
