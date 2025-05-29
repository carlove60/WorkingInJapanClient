import {isNullOrUndefined} from "../Helpers/Guard.ts";
import {Validator} from "../Interfaces/Validator.ts";
import {MessageType, ValidationMessage, PartyModel} from "../GeneratedClient";
import {isNullOrEmpty} from "../Helpers/StringHelper.ts";
import {isNumeric} from "../Helpers/NumberHelper.ts";

export class PartyModelValidator implements Validator<PartyModel> {
    public validate(model: PartyModel): ValidationMessage[] {
        const validationMessages: ValidationMessage[] = [];
        if (isNullOrUndefined(model)) {
            const validationMessage: ValidationMessage = {
                type: MessageType.Error,
                message: "No party found"
            };
            validationMessages.push(validationMessage);
        }
        if (isNullOrEmpty(model.name)) {
            const validationMessage: ValidationMessage = {
                type: MessageType.Error,
                message: "Please enter the name of your party"
            };
            validationMessages.push(validationMessage);
        }
        if (!isNumeric(model.size)) {
            const validationMessage: ValidationMessage = {
                type: MessageType.Error,
                message: "Please enter the size of your party"
            };
            validationMessages.push(validationMessage);
        }
        return validationMessages;
    };
}