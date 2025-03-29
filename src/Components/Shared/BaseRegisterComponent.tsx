import * as React from "react";
import FieldComponent from "../Shared/FieldComponent.tsx";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import {EnumText} from "../../Enums/EnumTextName.ts";
import {FieldType} from "../../Interfaces/FieldType.ts";
import {isNotNullOrUndefined} from "../../Helpers/Guard.ts";
import useUpdateModel from "../../Hooks/useUpdateModel.ts";
import {RegistrationModel} from "../../../generated-client/models";
import Box from "@mui/material/Box";

export interface IRegisterProps {
    onRegisterPressCallback?: () => void,
    onCancelPressCallback?: () => void,
    onChange: (model: RegistrationModel) => void
}

const BaseRegisterComponent = ({onRegisterPressCallback, onCancelPressCallback, onChange}: IRegisterProps) => {
    const { model: registrationModel, updateModel: setRegistrationModel } = useUpdateModel<RegistrationModel>({});

    React.useEffect(() => {
        onChange(registrationModel);
    }, [onChange, registrationModel]);

    const onRegisterPress = (): void => {
        if (isNotNullOrUndefined(onRegisterPressCallback)) {
            onRegisterPressCallback();
        }
    };

    const onCancelPress = (): void => {
        if (isNotNullOrUndefined(onCancelPressCallback)) {
            onCancelPressCallback();
        }
    };
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
        <div>
            <FieldComponent type={FieldType.Text} value={registrationModel.email} onChange={(value) => setRegistrationModel("email" ,value)} label={EnumText.Email} />
            <FieldComponent type={FieldType.Text} value={registrationModel.confirmEmail} onChange={(value) => setRegistrationModel("confirmEmail", value)} label={EnumText.EmailConfirm} />
            <FieldComponent type={FieldType.Text} value={registrationModel.password} onChange={(value) => setRegistrationModel("password",value)} label={EnumText.Password} />
            <FieldComponent type={FieldType.Text} value={registrationModel.confirmPassword} onChange={(value) => setRegistrationModel("confirmPassword",value)} label={EnumText.PasswordConfirm} />
            <ButtonComponent text={EnumText.Ok} onPress={onRegisterPress} />
            <ButtonComponent text={EnumText.Cancel} onPress={onCancelPress} />
        </div>
        </Box>
    )
}

export default BaseRegisterComponent;