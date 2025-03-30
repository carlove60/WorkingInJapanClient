import {isNullOrUndefined} from "../Helpers/Guard.ts";
import {Texts} from "../Constants/Texts.ts";
import {EnumText} from "../Enums/EnumTextName.ts";
import {MessageTypeObject, RegistrationModel, ValidationMessage} from "../../generated-api/models";
import {LanguageEnum} from "../Interfaces/ITranslatedText.ts";
import {Validator} from "../Interfaces/Validator.ts";

export class RegistrationValidator implements Validator<RegistrationModel> {
    public validate(registrationModel: RegistrationModel): ValidationMessage[] {
        const validationMessages: ValidationMessage[] = [];
        if (isNullOrUndefined(registrationModel)) {
            const emptyRegistrationMessage = Texts.filter((text) => text.Name == EnumText.Register)[0];
            const validationMessage: ValidationMessage = {
                type: MessageTypeObject.ErrorEscaped,
                messageJapanese: emptyRegistrationMessage.Texts.filter((text) => text.Language === LanguageEnum.Japanese)[0].Text,
                messageEnglish: emptyRegistrationMessage.Texts.filter((text) => text.Language === LanguageEnum.English)[0].Text
            };
            validationMessages.push(validationMessage);
        }

        return validationMessages;
    };
}