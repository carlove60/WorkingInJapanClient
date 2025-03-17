import {IUserRegistrationModel} from "../../ClientApi.ts";
import * as React from "react";
import FieldComponent from "../Shared/FieldComponent.tsx";
import {FieldType} from "../../Interfaces/FieldType.ts";
import {EnumText} from "../../Enums/EnumTextName.ts";
import ButtonComponent from "../Shared/ButtonComponent.tsx";

const CompanyRegistrationComponent: React.FunctionComponent  = () => {
    const [registrationModel, setRegistrationModel] = React.useState({} as IUserRegistrationModel);
    const onRegisterPress = (): void => {

    };

    const onCancelPress = (): void => {

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

export default CompanyRegistrationComponent;