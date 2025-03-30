import {ValidationMessage} from "../../generated-api/models";

export interface Validator<T> {
    validate(value: T): ValidationMessage[];
}