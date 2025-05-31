import * as React from "react";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import useUpdateModel from "../../Hooks/useUpdateModel.ts";
import { ExtendedValidationMessage, validatePartyDto } from "../../Validators/PartyModelValidator.ts";
import useValidatedModel from "../../Hooks/useValidatedModel.ts";
import ErrorComponent from "../Error/ErrorComponent.tsx";
import TextFieldComponent from "../Shared/TextFieldComponent.tsx";
import NumberFieldComponent from "../Shared/NumberFieldComponent.tsx";
import { getMessageForProperty } from "../../Helpers/ValidationMessageHelper.ts";
import { FormGroup } from "@mui/material";
import { PartyDto, WaitingListDto } from "../../ClientApi";
import { GetDefaultWaitingList } from "../../ClientApi/ClientApi.ts";

const AddToWaitingListComponent: React.FunctionComponent = () => {
  const [waitingListMetaDataModel, setWaitingListMetaDataModel] = React.useState<WaitingListDto>();
  const [errorMessages, setErrorMessages] = React.useState<ExtendedValidationMessage[]>();
  const { model: partyModel, updateModel: updatePartyModel } = useUpdateModel<PartyDto>({
    size: 0,
    name: "",
  });
  const { validationMessages } = useValidatedModel(partyModel, validatePartyDto);

  React.useEffect(() => {
    (async function () {
      const metaData = await GetDefaultWaitingList();
      setWaitingListMetaDataModel(metaData.waitingList);
    })();
  }, []);

  const onSubmitPress = (): void => {
    const errorMessages = validationMessages.filter(
      (validationMessage) => validationMessage.validationMessage.type === "error",
    );
    if (errorMessages.length > 0) {
      setErrorMessages(errorMessages);
    } else {
      setErrorMessages(undefined);
    }
  };

  const onCheckInPress = (): void => {};

  const onSizeChange = (value: number): void => {
    updatePartyModel("size", value);
  };

  const onNameChange = (value: string): void => {
    updatePartyModel("name", value);
  };

  return (
    <FormGroup style={{ width: "400px", display: "flex", flexDirection: "column", verticalAlign: "center" }}>
      <ErrorComponent value={errorMessages} onClose={() => setErrorMessages(undefined)} />
      <div style={{ width: "400px", display: "flex", flexDirection: "column", verticalAlign: "center" }}>
        <TextFieldComponent
          onChange={onNameChange}
          placeHolder={"Your name?"}
          errorMessage={getMessageForProperty("name", validationMessages, "error")}
          type={"text"}
          value={partyModel.name}
          label={"Name"}
        />
        <NumberFieldComponent
          onChange={onSizeChange}
          placeHolder={"The size of your party?"}
          errorMessage={getMessageForProperty("size", validationMessages, "error")}
          type={"number"}
          value={partyModel.size}
          label={"Size"}
        />
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonComponent text={"Submit"} onPress={onSubmitPress} disabled={validationMessages.length > 0} />
          <ButtonComponent text={"Check in"} onPress={onCheckInPress} disabled={validationMessages.length > 0} />
        </div>
        <div>Total seats available: {waitingListMetaDataModel?.totalSeatsAvailable}</div>
      </div>
    </FormGroup>
  );
};

export default AddToWaitingListComponent;
