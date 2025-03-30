import UserRegistrationComponent from "../../Components/Register/UserRegistrationComponent.tsx";
import CompanyRegistrationComponent from "../../Components/Register/CompanyRegistrationComponent.tsx";
import {RegistrationType, RegistrationTypeObject} from "../../../generated-api/models";
import {ReactNode} from "react";

interface RegisterPageProps {type: RegistrationType}
const RegistrationPage = ({type}: RegisterPageProps) => {

    const getRegistrationElement = (): ReactNode => {
        if (type === RegistrationTypeObject.User) {
            return <UserRegistrationComponent/>
        } else {
            return <CompanyRegistrationComponent/>
        }
    }

    return <div className={"flex-container"}>{getRegistrationElement()}</div>

}

export default RegistrationPage;