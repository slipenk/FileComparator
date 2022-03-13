import React, {useEffect, useState} from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import LogoName from "../../components/LogoName/LogoName";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from 'react-router-dom';
import Logo from "../../icons/Berulia.png";

const Login = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(value) {
        setIsSubmitted(value)
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
                    {!isSubmitted ? <LoginForm submitForm={submitForm} /> : null}
                    <div className={classes.alreadyReg + " " + classes.alreadyRegLogin}>
                        <div>
                            <Link to="/registration" > <i>Ще не маєте акаунту?<br/>Давайте створимо :)</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;