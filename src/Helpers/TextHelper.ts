import {LanguageEnum} from "../Interfaces/ITranslatedText.ts";
import {isNullOrUndefined} from "./Guard.ts";
import {Texts} from "../Constants/Texts.ts";
import {EnumText} from "../Enums/EnumTextName.ts";

export const getTranslatedText = (textName: EnumText, language: LanguageEnum): string | null | undefined => {
    const foundText = Texts.filter((text) => text.Name === textName)[0];
    if (isNullOrUndefined(foundText) || isNullOrUndefined(language)) {
        return "";
    }

    return foundText.Texts.filter((text) => text.Language === language)[0]?.Text;
}