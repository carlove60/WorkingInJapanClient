import {Client, RegistrationType, UserRegistrationModel} from "../../ClientApi.ts";
import * as React from "react";
import BaseRegisterComponent from "../Shared/BaseRegisterComponent.tsx";

const UserRegistrationComponent: React.FunctionComponent  = () => {
    const [registrationModel, setRegistrationModel] = React.useState({} as UserRegistrationModel);

    const onCancelPress = (): void => {

    };

    const onRegisterPress = () => {
        const client = new Client();
        const result = client.register(registrationModel);
        result.then((result) => {
            console.log(result);
        })
    }

    const onChange = (value: UserRegistrationModel): void => {
        value.type = RegistrationType.User;
        setRegistrationModel(value);
    };

    return <BaseRegisterComponent onChange={onChange} onRegisterPressCallback={onRegisterPress} onCancelPressCallback={onCancelPress} />;
}

export default UserRegistrationComponent;