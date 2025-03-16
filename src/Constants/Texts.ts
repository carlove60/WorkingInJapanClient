import IText from "../Interfaces/IText.ts";
import {EnumText} from "../Enums/EnumTextName.ts";


export const WelcomeText = "Welcome Text";

export const Texts: IText[] = [{
    Name: EnumText.Ok,
    English: "Ok",
    Japanese: "OK"
},
{
    Name: EnumText.Cancel,
    English: "Ok",
    Japanese: "OK"
},
{
    Name: EnumText.FirstName,
    English: "First name",
    Japanese: "OK"
},
{
    Name: EnumText.LastName,
    English: "Last name",
    Japanese: "OK"
},
{
    Name: EnumText.Email,
    English: "Email address",
    Japanese: "OK"
},
{
    Name: EnumText.EmailConfirm,
    English: "Confirm email address",
    Japanese: "OK"
},    {
    Name: EnumText.Password,
    English: "Password",
    Japanese: "OK"
}, {
    Name: EnumText.PasswordConfirm,
    English: "Confirm password",
    Japanese: "OK"
}, {
    Name: EnumText.UndefinedModel,
    English: "No model defined",
    Japanese: "やばい"
    }
];