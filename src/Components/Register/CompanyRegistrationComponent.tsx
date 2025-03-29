import * as React from "react";
import BaseRegisterComponent from "../Shared/BaseRegisterComponent.tsx";
import {RegistrationModel, RegistrationTypeObject} from "../../../generated-client/models";
import Client from "../../ApiClient.ts";

const CompanyRegistrationComponent: React.FunctionComponent  = () => {
    const [registrationModel, setRegistrationModel] = React.useState<RegistrationModel>({});

    const onCancelPress = (): void => {

    };

    const onRegisterPress = () => {
        registrationModel.type = RegistrationTypeObject.Company;
        const result = Client.instance.api.user.register.post(registrationModel);
        result.then((result) => {
            console.log(result);
        })
    }

    const onChange = (value: RegistrationModel): void => {
        setRegistrationModel(value);
    };

    return <BaseRegisterComponent onChange={onChange} onRegisterPressCallback={onRegisterPress} onCancelPressCallback={onCancelPress} />;
}

export default CompanyRegistrationComponent;