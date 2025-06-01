import * as React from "react";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import useUpdateModel from "../../Hooks/useUpdateModel.ts";
import { validatePartyDto } from "../../Validators/PartyModelValidator.ts";
import useValidatedModel from "../../Hooks/useValidatedModel.ts";
import ErrorComponent from "../Error/ErrorComponent.tsx";
import TextFieldComponent from "../Shared/TextFieldComponent.tsx";
import NumberFieldComponent from "../Shared/NumberFieldComponent.tsx";
import { getMessageForProperty } from "../../Helpers/ValidationMessageHelper.ts";
import { FormGroup } from "@mui/material";
import { PartyDto, ValidationMessage } from "../../ClientApi";
import { AddToWaitingList } from "../../ClientApi/ClientApi.ts";
import { validatePartySize } from "../../Validators/WaitingListValidator.ts";
import CurrentQueue from "./CurrentQueue.tsx";

interface Props {
  parties: PartyDto[] | undefined;
  seatsAvailable: number | undefined;
  isLoading: boolean;
  waitingListName: string;
  onCheckIn: (party: PartyDto | undefined) => void;
}

const AddToWaitingListComponent = ({
  parties,
  seatsAvailable,
  isLoading,
  waitingListName,
  onCheckIn,
}: Props): React.ReactNode => {
  const [messages, setMessages] = React.useState<ValidationMessage[]>([]);
  const [isDisabled, setDisabled] = React.useState(false);
  const { model: partyDto, updateModel: updatePartyModel } = useUpdateModel<PartyDto>({
    size: "" as unknown as number,
    name: "",
    waitingListName: waitingListName,
  });
  const { validationMessages } = useValidatedModel(partyDto, validatePartyDto);

  React.useEffect(() => {
    const partySizeValidation = validatePartySize(partyDto.size, seatsAvailable ?? 0);
    setMessages(partySizeValidation ? [partySizeValidation] : []);
  }, [validationMessages]);

  const onSubmitPress = async (): Promise<void> => {
    if (messages.length === 0 && validationMessages.length === 0) {
      setDisabled(true);
      const result = await AddToWaitingList({ party: partyDto });
      onCheckIn(result.party);
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

  return (
    <FormGroup
      onKeyUp={onKeyUp}
      style={{ width: "400px", display: "flex", flexDirection: "column", verticalAlign: "center" }}
    >
      <ErrorComponent messages={messages} onClose={() => setMessages([])} />
      <div style={{ width: "400px", display: "flex", flexDirection: "column", verticalAlign: "center" }}>
        <TextFieldComponent
          onChange={onNameChange}
          placeHolder={"Your name?"}
          errorMessage={getMessageForProperty("name", validationMessages, "error")}
          type={"text"}
          value={partyDto.name}
          label={"Name"}
          disabled={isDisabled || isLoading}
        />
        <NumberFieldComponent
          onChange={onSizeChange}
          placeHolder={"The size of your party?"}
          errorMessage={getMessageForProperty("size", validationMessages, "error")}
          type={"number"}
          value={partyDto.size}
          label={"Size"}
          disabled={isDisabled || isLoading}
        />
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonComponent
            text={"Join the waiting list"}
            onPress={onSubmitPress}
            disabled={validationMessages.length > 0 || messages?.length > 0}
          />
        </div>
        <div>Total seats available: {seatsAvailable ?? 0}</div>
        <CurrentQueue parties={parties} />
      </div>
    </FormGroup>
  );
};

export default AddToWaitingListComponent;
