import * as React from "react";
import FieldComponent from "../Shared/FieldComponent.tsx";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import {EnumText} from "../../Enums/EnumTextName.ts";
import {FieldType} from "../../Interfaces/FieldType.ts";
import {IUserRegistrationModel} from "../../ClientApi.ts";
import {isNotNullOrUndefined} from "../../Helpers/Guard.ts";

export interface IRegisterProps {
    type: "Company" | "Searcher",
    onRegisterPressCallback?: (registrationModel: IUserRegistrationModel, type: "Company" | "Searcher") => void,
    onCancelPressCallback?: () => void,
}

const BaseRegisterComponent: React.FunctionComponent = ({type, onRegisterPressCallback, onCancelPressCallback}: IRegisterProps) => {
    const [registrationModel, setRegistrationModel] = React.useState({} as IUserRegistrationModel);
    const onRegisterPress = (): void => {
        if (isNotNullOrUndefined(onRegisterPressCallback)) {
            onRegisterPressCallback(registrationModel, type);
        }
    };

    const onCancelPress = (): void => {
        if (isNotNullOrUndefined(onCancelPressCallback)) {
            onCancelPressCallback();
        }
    };

    const updateRegistrationModel = (key: keyof IUserRegistrationModel, value: string): void => {
        setRegistrationModel(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <div>
            <FieldComponent type={FieldType.Text} value={registrationModel.email} onChange={(value) => updateRegistrationModel("email" ,value)} label={EnumText.Email} />
            <FieldComponent type={FieldType.Text} value={registrationModel.confirmEmail} onChange={(value) => updateRegistrationModel("confirmEmail", value)} label={EnumText.EmailConfirm} />
            <FieldComponent type={FieldType.Text} value={registrationModel.password} onChange={(value) => updateRegistrationModel("password",value)} label={EnumText.Password} />
            <FieldComponent type={FieldType.Text} value={registrationModel.confirmPassword} onChange={(value) => updateRegistrationModel("confirmPassword",value)} label={EnumText.PasswordConfirm} />
            <ButtonComponent text={EnumText.Ok} onPress={onRegisterPress} />
            <ButtonComponent text={EnumText.Cancel} onPress={onCancelPress} />
        </div>
    )
}

export default BaseRegisterComponent;