import {RegistrationType} from "../../ClientApi.ts";
import UserRegistrationComponent from "../../Components/Register/UserRegistrationComponent.tsx";
import CompanyRegistrationComponent from "../../Components/Register/CompanyRegistrationComponent.tsx";

interface RegisterPageProps {type: RegistrationType}
const RegistrationPage = ({type}: RegisterPageProps) => {

    if (type === RegistrationType.User) {
        return <UserRegistrationComponent />
    }
    else {
        return <CompanyRegistrationComponent />
    }

}

export default RegistrationPage;