import React from "react";
import classes from './Registration.module.css';
import LogoName from "../../components/LogoName/LogoName";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";


const Registration = () => {
    return (
        <div className={classes.RegistrationDiv}>
            <div className={classes.flexDiv}>
               <LogoName/>
            <form>
                <RegistrationForm/>
            </form>
            </div>
        </div>
    );
};


export default Registration;