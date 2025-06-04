import * as React from "react";
import ButtonComponent from "../Shared/ButtonComponent/ButtonComponent.tsx";
import useUpdateModel from "../../Hooks/UseUpdateModel/useUpdateModel.ts";
import { validatePartyDto } from "../../Validators/PartyModelValidator/PartyModelValidator.ts";
import useValidatedModel from "../../Hooks/UseValidatedModel/useValidatedModel.ts";
import TextFieldComponent from "../Shared/TextFieldComponent/TextFieldComponent.tsx";
import NumberFieldComponent from "../Shared/NumberFieldComponent/NumberFieldComponent.tsx";
import { getMessageForProperty, hasErrors } from "../../Helpers/ValidationMessageHelper/ValidationMessageHelper.ts";
import { PartyDto, ValidationMessage } from "../../ClientApi";
import { AddToWaitingList } from "../../ClientApi/ClientApi.ts";
import { validatePartySize } from "../../Validators/WaitingListvalidator/WaitingListValidator.ts";
import CurrentQueueComponent from "../CurrentQueueComponent/CurrentQueueComponent.tsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";
import { isNotNullOrUndefined } from "../../Helpers/Guard/Guard.ts";

export interface Props {
  parties: PartyDto[] | undefined;
  seatsAvailable: number | undefined;
  waitingListName: string | undefined;
  onSignUp: (party: PartyDto | undefined) => void;
  setMessages: (message: ValidationMessage[]) => void;
  messages: ValidationMessage[];
}

const AddToWaitingListComponent = ({
  parties,
  seatsAvailable,
  waitingListName,
  onSignUp,
  setMessages,
  messages,
}: Props): React.ReactNode => {
  const [isDisabled, setDisabled] = React.useState(false);
  const { model: partyDto, updateModel: updatePartyModel } = useUpdateModel<PartyDto>({
    size: 0,
    name: "",
    waitingListName: waitingListName,
  });
  const { validationMessages } = useValidatedModel(partyDto, validatePartyDto);

  React.useEffect(() => {
    const partySizeValidation = validatePartySize(partyDto.size, seatsAvailable ?? 0);
    if (isNotNullOrUndefined(partySizeValidation)) {
      setMessages([partySizeValidation]);
    }
  }, [partyDto.size, seatsAvailable]);

  const onSubmitPress = async (): Promise<void> => {
    if (!hasErrors(messages) && validationMessages.length === 0) {
      setDisabled(true);
      const result = await AddToWaitingList({ party: { ...partyDto, waitingListName: waitingListName } });
      const noErrorMessages = result.messages.filter((m) => m.type === "error").length === 0;
      if (noErrorMessages) {
        onSignUp(result.party);
      }
      setMessages(result.messages);
      setDisabled(false);
    }
  };

  const onSizeChange = (value: number): void => {
    updatePartyModel("size", value);
  };

  const onNameChange = (value: string): void => {
    updatePartyModel("name", value);
  };

  const onKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await onSubmitPress();
    }
  };

  const isButtonDisabled = (): boolean => {
    return validationMessages.length > 0 || hasErrors(messages) || seatsAvailable === 0 || isDisabled;
  };

  const sx: SxProps<Theme> = {
    height: 50,
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Join the Waitlist
      </Typography>
      <Box onKeyUp={onKeyUp} display="flex" flexDirection="column" gap={2}>
        <TextFieldComponent
          onChange={onNameChange}
          placeHolder={"Your name?"}
          errorMessage={getMessageForProperty("name", validationMessages, "error")}
          type={"text"}
          value={partyDto.name}
          label={"Name"}
          disabled={isDisabled}
          sx={sx}
        />
        <NumberFieldComponent
          onChange={onSizeChange}
          placeHolder={"The size of your party?"}
          errorMessage={getMessageForProperty("size", validationMessages, "error")}
          type={"number"}
          value={partyDto.size}
          label={"Size"}
          disabled={isDisabled}
          sx={sx}
        />
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonComponent text={"Join the waiting list"} onPress={onSubmitPress} disabled={isButtonDisabled()} />
        </div>
        <div>Total seats available: {seatsAvailable ?? 0}</div>
        <CurrentQueueComponent parties={parties} />
      </Box>
    </>
  );
};

export default AddToWaitingListComponent;
