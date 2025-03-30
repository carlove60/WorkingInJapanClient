import * as React from "react";
import BaseRegisterComponent from "../Shared/BaseRegisterComponent.tsx";
import {RegistrationTypeObject, RegistrationModel} from "../../../generated-api/models";
import Client from "../../ApiClient.ts";
import {add} from "../Error/BubbleSlice.ts";
import {store} from "../../store.ts";

const UserRegistrationComponent: React.FunctionComponent  = () => {
    const [registrationModel, setRegistrationModel] = React.useState({} as RegistrationModel);

    const onCancelPress = (): void => {

    };

    const onRegisterPress = () => {
        registrationModel.type = RegistrationTypeObject.User;
        const result = Client.instance.api.user.register.post(registrationModel);
        result.then((resultObject) => {
            if (resultObject?.isError) {
                resultObject.userMessages?.forEach((message) => {
                store.dispatch(add({ message: message.messageEnglish, type: message.type }));
                });
            }
        })
    }

    const onChange = (value: RegistrationModel): void => {
        setRegistrationModel(value);
    };

    return <BaseRegisterComponent onChange={onChange} onRegisterPressCallback={onRegisterPress} onCancelPressCallback={onCancelPress} />;
}

export default UserRegistrationComponent;