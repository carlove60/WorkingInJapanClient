import {LanguageEnum} from "../Interfaces/ITranslatedText.ts";
import {PageTexts} from "../TextContent/PageText.ts";
import {IsNullOrUndefined} from "./Guard.ts";

export const GetText = (textName: string, language: LanguageEnum): string => {
    const foundText = PageTexts.filter((text) => text.Name === textName)[0];
    if (IsNullOrUndefined(foundText) || IsNullOrUndefined(language)) {
        return "";
    }

    if (language === LanguageEnum.Japanese) {
        return foundText.Japanese;
    }

    return foundText.English;
}