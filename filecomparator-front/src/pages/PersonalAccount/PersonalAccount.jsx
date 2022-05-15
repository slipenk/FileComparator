import React, {useState} from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import classesM from "../Menu/Menu.module.css";
import classesF from "./PersonalAccount.module.css";
import InfoLogo from "../../icons/Information.png";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Circles from "../../components/UI/circle/Circles";


const PersonalAccount = () => {
    const [, setIsSubmitted] = useState(false);

    function submitForm(value) {
        setIsSubmitted(value);
    }

    return (
        <div className={classes.MainDiv}>
            <div className={classesM.flexDivMenu}>
                <Circles/>
                <div className={classesF.alignForm}>
                    <RegistrationForm submitForm={submitForm} isRegistration={false} />
                </div>
                <div>
                    <img className={classesF.ImageDiv} src={InfoLogo} alt={"Логотип особистого акаунту"}/>
                </div>
            </div>
        </div>
    );
};


export default PersonalAccount;