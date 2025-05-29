import * as React from "react";
import {FieldType} from "../../Interfaces/FieldType.ts";
import {TextField} from "@mui/material";
import {MessageTypeObject} from "../../../generated-api/models";
import {isNotNullOrUndefined} from "../../Helpers/Guard.ts";
import {ValidationMessage} from "../../GeneratedClient";

interface Props {
    type: FieldType;
    label: string;
    value: string | number | null | undefined;
    onChange?: (value: string) => void | undefined;
    readOnly?: boolean;
    autoComplete?: string;
    validationMessage?: ValidationMessage;
}

const FieldComponent = ({type, label, value, onChange, readOnly, autoComplete, validationMessage} : Props) => {
    const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isNotNullOrUndefined(onChange) && !readOnly) {
            onChange(e.currentTarget.value);
        }
    }


    return <TextField error={validationMessage?.type === MessageTypeObject.ErrorEscaped} aria-errormessage={validationMessage?.message as string} autoComplete={autoComplete} variant={"standard"} type={FieldType[type]} style={{display: "flex"}} id="outlined-basic" label={label} onChange={onContentChange} value={value} />;
};

export default FieldComponent;