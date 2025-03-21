import {isNullOrUndefined} from "../Helpers/Guard.ts";
import {Texts} from "../Constants/Texts.ts";
import {EnumText} from "../Enums/EnumTextName.ts";
import IText from "../Interfaces/IText.ts";
import {UserRegistrationModel} from "../../generated-client/models";


export const validateRegistration = (registrationModel: UserRegistrationModel): IText[] => {
    const validationMessages: IText[] = [];
    if (isNullOrUndefined(registrationModel)) {
        const emptyUserRegistrationmessage = Texts.filter((text) => text.Name == EnumText.Register)[0];
        validationMessages.push(emptyUserRegistrationmessage);
    }

    return validationMessages;
};