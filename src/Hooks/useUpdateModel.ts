import * as React from "react";
import {isNotNullOrEmpty} from "../Helpers/StringHelper.ts";
import {Validator} from "../Interfaces/Validator.ts";
import {ValidationMessage} from "../../generated-api/models";

function useUpdateModel<T>(initialValue: T, validator?: Validator<T>) {
    const [model, setModel] = React.useState<T>(initialValue);
    const [validationMessages, setValidationMessages] = React.useState<ValidationMessage[]>();

    const updateModel = (key: keyof T, value: T[keyof T]) => {
        if (isNotNullOrEmpty(key as string)) {
            setModel(prevState => ({
                ...prevState,
                [key]: value
            }));
            validator?.validate(model);
        }
    };

    React.useEffect(() => {
        const newValidationMessages = validator?.validate(model);
        setValidationMessages(newValidationMessages);
    }, [model, validator]);

    return {model, updateModel, validationMessages};
}


export default useUpdateModel;