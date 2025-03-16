import {LanguageEnum} from "../Interfaces/ITranslatedText.ts";
import {PageTexts} from "../TextContent/PageText.ts";
import {isNullOrUndefined} from "./Guard.ts";

export const GetText = (textName: string, language: LanguageEnum): string => {
    const foundText = PageTexts.filter((text) => text.Name === textName)[0];
    if (isNullOrUndefined(foundText) || isNullOrUndefined(language)) {
        return "";
    }

    if (language === LanguageEnum.Japanese) {
        return foundText.Japanese;
    }

    return foundText.English;
}