import React, {useState} from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import LogoName from "../../components/LogoName/LogoName";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true)
    }

    return (
        <div className={classes.RegistrationDiv}>
            <div className={classes.flexDiv}>
                <LogoName/>
                <div>
                    {!isSubmitted ? <LoginForm submitForm={submitForm} /> : null}
                    <div className={classes.alreadyReg}>
                        <div>
                            <a href=" "><i>Ще не маєте акаунту?<br/>Давайте створимо :)</i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;