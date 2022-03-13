import React, {useEffect, useState} from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import LogoName from "../../components/LogoName/LogoName";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";
import { Link } from 'react-router-dom';
import Logo from "../../icons/Berulia.png";


const Registration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(value) {
        setIsSubmitted(value);
    }

    useEffect(() => {
        setIsSubmitted(isSubmitted);
    }, [isSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes.MainDiv}>
            <div className={classes.flexDiv}>
                {localStorage.setItem('IsMenu', 'false')}
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
                <div>
                    {!isSubmitted ? <RegistrationForm submitForm={submitForm} /> : <RegistrationSuccess/>}
                    <div className={classes.alreadyReg}>
                        Вже маєте акаунт?
                        <div>
                            <Link to="/login" ><i>Вхід</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Registration;