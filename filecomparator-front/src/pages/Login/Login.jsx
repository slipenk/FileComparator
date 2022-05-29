import React, {useRef} from "react";
import classes from '../../FormStyle/FormStyle.module.css';
import LogoName from "../../components/LogoName/LogoName";
import LoginForm from "../../components/LoginForm/LoginForm";
import {Link, useNavigate} from 'react-router-dom';
import Logo from "../../icons/Berulia.png";

const Login = () => {
    const isSubmitted = useRef(false);
    const navigate = useNavigate();

    function submitForm(value) {
        isSubmitted.current = value;
        if(isSubmitted.current === true) {
            navigate("/menu");
        }
    }

    return (
        <div className={classes.MainDiv}>
            <div className={classes.flexDiv}>
                {localStorage.setItem('IsMenu', 'false')}
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
                <div>
                    <LoginForm submitForm={submitForm}/>
                    <div className={classes.alreadyReg + " " + classes.alreadyRegLogin}>
                        <div>
                            <Link to="/registration" > <i>Ще не маєте акаунта?<br/>Давайте створимо :)</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;