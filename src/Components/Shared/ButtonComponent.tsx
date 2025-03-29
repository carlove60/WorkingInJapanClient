import * as React from "react";
import {isNotNullOrUndefined} from "../../Helpers/Guard.ts";
import {EnumText} from "../../Enums/EnumTextName.ts";
import {Button} from "@mui/material";
import * as Guard from "../../Helpers/Guard.ts";
import {getTranslatedText} from "../../Helpers/TextHelper.ts";
import {LanguageEnum} from "../../Interfaces/ITranslatedText.ts";

interface buttonProps {
    text: EnumText;
    onPress: () => void;
}
const buttonComponent: React.FunctionComponent<buttonProps> = ({ onPress, text }: buttonProps) => {
    const onClick = (): void => {
        if (isNotNullOrUndefined(onPress)) {
            onPress();
        }
    };

    const labelText = (): string => {
        if (Guard.isNotNullOrUndefined(text)) {
            return getTranslatedText(text, LanguageEnum.English) ?? "";
        }

        return "Button";
    };

    return <Button onClick={onClick}>{labelText()}</Button>
}

export default buttonComponent;