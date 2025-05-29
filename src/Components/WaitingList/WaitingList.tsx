import * as React from "react";
import FieldComponent from "../Shared/FieldComponent.tsx";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import {FieldType} from "../../Interfaces/FieldType.ts";
import {WaitingListModel} from "../../../generated-api/models";
import {PartyModel, ValidationMessage} from "../../GeneratedClient";
import {GetMetaData} from "../../GeneratedClient/ClientApi.ts";
import useUpdateModel from "../../Hooks/useUpdateModel.ts";
import {PartyModelValidator} from "../../Validators/PartyModelValidator.ts";

const WaitingList: React.FunctionComponent = () => {
    const [ waitingListMetaDataModel, setWaitingListMetaDataModel ] =  React.useState<WaitingListModel>();
    const [ validationMessages, setValidationMessages ] =  React.useState<ValidationMessage[]>([]);
    const { model: partyModel, updateModel: updatePartyModel } = useUpdateModel<PartyModel>({}, new PartyModelValidator());

    React.useEffect( ()  => {
        (async function() {
            const metaData = await GetMetaData();
            setWaitingListMetaDataModel(metaData.records[0]);
            setValidationMessages([...validationMessages, ...metaData.messages]);
        })();
    }, [])


    const onSubmitPress = (): void => {

    };

    const onCheckInPress = (): void => {
    };
    return (
        <>
            <FieldComponent onChange={(value) => updatePartyModel("name" ,value)} type={FieldType.Text} value={partyModel.name} label={"Name"} />
            <FieldComponent onChange={(value) => updatePartyModel("size" ,value)} type={FieldType.Number} value={partyModel.size} label={"Size"} />
            <ButtonComponent text={"Submit"} onPress={onSubmitPress} />
            <ButtonComponent text={"Check in"} onPress={onCheckInPress} />

            <div>Total seats available: {waitingListMetaDataModel?.totalSeatsAvailable}</div>
        </>
    );
}

export default WaitingList;