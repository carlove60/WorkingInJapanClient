import * as React from "react";
import FieldComponent from "../Shared/FieldComponent.tsx";
import ButtonComponent from "../Shared/ButtonComponent.tsx";
import {EnumText} from "../../Enums/EnumTextName.ts";
import {FieldType} from "../../Interfaces/FieldType.ts";
import Client from "../../ApiClient.ts";
import {store} from "../../store.ts";
import {add} from "../Error/BubbleSlice.ts";
import {LoginModel} from "../../../generated-api/models";
import useUpdateModel from "../../Hooks/useUpdateModel.ts";

const LoginComponent: React.FunctionComponent = () => {
    const { model: loginModel, updateModel: setLoginModel } = useUpdateModel<LoginModel>({});

    const onLoginPress = (): void => {
        const result = Client.instance.api.auth.login.post(loginModel);
        result.then((resultObject) => {
            if (resultObject?.isError) {
                resultObject.userMessages?.forEach((message) => {
                    store.dispatch(add({ message: message.messageEnglish, type: message.type }));
                });
            }
        })
    };

    const onCancelPress = (): void => {

    };
    return (
        <>
            <FieldComponent onChange={(value) => setLoginModel("email" ,value)} type={FieldType.Text} value={loginModel.email} label={EnumText.Email} />
            <FieldComponent onChange={(value) => setLoginModel("password" ,value)} autoComplete={"current-password"} type={FieldType.Password} value={loginModel.password} label={EnumText.Password} />
            <ButtonComponent text={EnumText.Ok} onPress={onLoginPress} />
            <ButtonComponent text={EnumText.Cancel} onPress={onCancelPress} />
        </>
    );
}

export default LoginComponent;