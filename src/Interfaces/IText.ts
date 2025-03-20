import {EnumText} from "../Enums/EnumTextName.ts";
import {ITranslatedText} from "./ITranslatedText.ts";

export default interface IText {
    Name: EnumText;
    Texts: ITranslatedText[]
}