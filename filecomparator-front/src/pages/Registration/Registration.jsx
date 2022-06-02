import React from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import LogoName from "../../components/LogoName/LogoName";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Link } from 'react-router-dom';
import Logo from "../../icons/Berulia.png";
import {useNavigate} from "react-router-dom";


const Registration = () => {
    const navigate = useNavigate();

    function submitForm(value) {
        if(value === true) {
            navigate("/registrationSuccess");
        }
    }

    return (
        <div className={classes.MainDiv}>
            <div className={classes.flexDiv}>
                {localStorage.setItem('IsMenu', 'false')}
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
                <div>
                    <RegistrationForm submitForm={submitForm} isRegistration={true} />
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