import IText from "../Interfaces/IText.ts";
import {EnumText} from "../Enums/EnumTextName.ts";
import {LanguageEnum} from "../Interfaces/ITranslatedText.ts";

export const Texts: IText[] = [{
    Name: EnumText.Welcome,
    Texts: [{
        Language: LanguageEnum.English,
        Text: "Welcome"
    },{
        Language: LanguageEnum.Japanese,
        Text: "Welcome"
    }]
}];