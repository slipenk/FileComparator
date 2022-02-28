import React from "react";
import classes from './RegistrationForm.module.css';
import NameInput from "../../icons/NameIcon.png";
import InputOwn from "../UI/input/InputOwn";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import RPasswordInput from "../../icons/RPassword.png";
import SubmitButtonForm from "../SubmitButtonForm/SubmitButtonForm";

const RegistrationForm = () => {
    return (
        <div>
            <div className={classes.col_h}>
                <h1>Реєстрація</h1>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={NameInput} alt="Прізвисько"/>
                    </div>
                    <InputOwn type="text" placeholder="Прізвисько"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={EmailInput} alt="Електронна пошта"/>
                    </div>
                    <InputOwn type="email" placeholder="Електронна пошта"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={PasswordInput} alt="Пароль"/>
                    </div>
                    <InputOwn type="password" placeholder="Пароль"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={RPasswordInput} alt="Повторіть пароль"/>
                    </div>
                    <InputOwn type="password" placeholder="Повторіть пароль"/>
                </div>
            </div>
            <SubmitButtonForm value={"ЗАРЕЄСТРУВАТИСЯ"}/>
        </div>
    );
};


export default RegistrationForm;