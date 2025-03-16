import * as React from "react";
import FieldComponent from "../Shared/FieldComponent.tsx";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import {EnumText} from "../../Enums/EnumTextName.ts";
import {FieldType} from "../../Interfaces/FieldType.ts";

const LoginComponent: React.FunctionComponent = () => {
    const onLoginPress = (): void => {

    };

    const onCancelPress = (): void => {

    };
    return (
        <div>
            <FieldComponent type={FieldType.Text} value={"asda"} label={EnumText.Email} />
            <FieldComponent type={FieldType.Text} value={"asda"} label={EnumText.Password} />
            <ButtonComponent text={EnumText.Ok} onPress={onLoginPress} />
            <ButtonComponent text={EnumText.Cancel} onPress={onCancelPress} />
        </div>
    );
}

export default LoginComponent;