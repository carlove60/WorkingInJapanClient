import UserRegistrationComponent from "../../Components/Register/UserRegistrationComponent.tsx";
import CompanyRegistrationComponent from "../../Components/Register/CompanyRegistrationComponent.tsx";
import {RegistrationType, RegistrationTypeObject} from "../../../generated-client/models";

interface RegisterPageProps {type: RegistrationType}
const RegistrationPage = ({type}: RegisterPageProps) => {

    if (type === RegistrationTypeObject.User) {
        return <UserRegistrationComponent />
    }
    else {
        return <CompanyRegistrationComponent />
    }

}

export default RegistrationPage;