import * as React from "react";
import {FieldType} from "../../Interfaces/FieldType.ts";
import * as Guard from "../../Helpers/Guard.ts";
import DraftEditor from "./DraftJs.tsx";
import {EnumText} from "../../Enums/EnumTextName.ts";
import {getTranslatedText} from "../../Helpers/TextHelper.ts";
import {LanguageEnum} from "../../Interfaces/ITranslatedText.ts";

interface Props {
    type: FieldType;
    label: EnumText;
    value: string | null | undefined;
    onChange?: (value: string) => void | undefined;
    readOnly?: boolean;
}

const FieldComponent = ({type, label, value, onChange, readOnly} : Props) => {
    const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (Guard.isNotNullOrUndefined(onChange) && !readOnly) {
            onChange(value as string);
        }
    }

    if (type === FieldType.Html) {
       return <DraftEditor content={value as string} onChange={onChange} />
    }

    const labelText = (): string => {
        if (Guard.isNotNullOrUndefined(label)) {
            return getTranslatedText(EnumText.Welcome, LanguageEnum.English) ?? "";
        }

        return "Label";
    };

    return <div aria-label={labelText()} onChange={onContentChange}>{value}</div>
};

export default FieldComponent;