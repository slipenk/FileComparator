import React from "react";
import classes from './Registration.module.css';
import LogoName from "../../components/LogoName/LogoName";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";


const Registration = () => {
    return (
        <div className={classes.RegistrationDiv}>
            <div className={classes.flexDiv}>
               <LogoName/>
                <div>
                <form>
                    <RegistrationForm/>
                </form>
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