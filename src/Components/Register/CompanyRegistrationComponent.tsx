import * as React from "react";
import BaseRegisterComponent from "../Shared/BaseRegisterComponent.tsx";
import {UserRegistrationModel, RegistrationTypeObject} from "../../../generated-client/models";
import {apiClient} from "../../ApiClient.ts";

const CompanyRegistrationComponent: React.FunctionComponent  = () => {
    const [registrationModel, setRegistrationModel] = React.useState({} as UserRegistrationModel);

    const onCancelPress = (): void => {

    };

    const onRegisterPress = () => {
        registrationModel.type = RegistrationTypeObject.Company;
        const result = apiClient.api.auth.register.post(registrationModel);
        result.then((result) => {
            console.log(result);
        })
    }

    const onChange = (value: UserRegistrationModel): void => {
        setRegistrationModel(value);
    };

    return <BaseRegisterComponent onChange={onChange} onRegisterPressCallback={onRegisterPress} onCancelPressCallback={onCancelPress} />;
}

export default CompanyRegistrationComponent;