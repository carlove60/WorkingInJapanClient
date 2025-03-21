import * as React from "react";
import BaseRegisterComponent from "../Shared/BaseRegisterComponent.tsx";
import {RegistrationTypeObject, UserRegistrationModel} from "../../../generated-client/models";
import Client from "../../ApiClient.ts";

const UserRegistrationComponent: React.FunctionComponent  = () => {
    const [registrationModel, setRegistrationModel] = React.useState({} as UserRegistrationModel);

    const onCancelPress = (): void => {

    };

    const onRegisterPress = () => {
        registrationModel.type = RegistrationTypeObject.User;
        const result = Client.instance.api.user.register.post(registrationModel);
        result.then((result) => {
            console.log(result);
        })
    }

    const onChange = (value: UserRegistrationModel): void => {
        setRegistrationModel(value);
    };

    return <BaseRegisterComponent onChange={onChange} onRegisterPressCallback={onRegisterPress} onCancelPressCallback={onCancelPress} />;
}

export default UserRegistrationComponent;