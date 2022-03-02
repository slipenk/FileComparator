import React, {useState} from "react";
import classes from './Registration.module.css';
import LogoName from "../../components/LogoName/LogoName";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";


const Registration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true)
    }

    return (
        <div className={classes.RegistrationDiv}>
            <div className={classes.flexDiv}>
                <LogoName/>
                <div>
                    {!isSubmitted ? <RegistrationForm submitForm={submitForm} /> : <RegistrationSuccess/>}
                    <div className={classes.alreadyReg}>
                        Вже маєте акаунт?
                        <div>
                            <a href=" "><i>Вхід</i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Registration;