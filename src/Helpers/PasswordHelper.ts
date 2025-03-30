import {MessageTypeObject, ValidationMessage} from "../../generated-api/models";

export const Validate = (value: string): ValidationMessage[] => {
    const validationMessages: ValidationMessage[] = [];
    const trimmedValue = value?.trim();
    if (!trimmedValue || trimmedValue.length < 8) {
        validationMessages.push({type: MessageTypeObject.ErrorEscaped, messageEnglish: "", messageJapanese: ""});
    }
    const format = /[ `!@#$%^&*()_+-=[\]{};':"\\|,.<>/?~]/;
    if (!trimmedValue.match(format)) {
        validationMessages.push({type: MessageTypeObject.ErrorEscaped, messageEnglish: "", messageJapanese: ""});
    }
    if (!hasUpperCase(trimmedValue)) {
        validationMessages.push({type: MessageTypeObject.ErrorEscaped, messageEnglish: "", messageJapanese: ""});
    }

    const alphabetCheckFormat = /^[A-Za-z]+$/;
    if (!trimmedValue.match(alphabetCheckFormat)) {
        validationMessages.push({type: MessageTypeObject.ErrorEscaped, messageEnglish: "", messageJapanese: ""});
    }


    return validationMessages;
};

const hasUpperCase = (str: string)=> {
    return str !== str.toLowerCase();
}