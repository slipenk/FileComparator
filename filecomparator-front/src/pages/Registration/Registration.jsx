import React, {useEffect, useState} from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import LogoName from "../../components/LogoName/LogoName";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";
import { Link } from 'react-router-dom';


const Registration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(value) {
        setIsSubmitted(value);
        console.log(value);
    }
    useEffect(() => {
        setIsSubmitted(isSubmitted);
        console.log(isSubmitted);
    }, [isSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes.RegistrationDiv}>
            <div className={classes.flexDiv}>
                <LogoName/>
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