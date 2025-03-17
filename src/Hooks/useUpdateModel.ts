import * as React from "react";
import {isNotNullOrEmpty} from "../Helpers/StringHelper.ts";

function useUpdateModel<T>(initialValue: T) {
    const [model, setModel] = React.useState<T>(initialValue);

    const updateModel = (key: keyof T, value: T[keyof T]) => {
        if (isNotNullOrEmpty(key as string)) {
            setModel(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    return {model, updateModel};
}

export default useUpdateModel;