import React from "react";
import classes from './RegistrationForm.module.css';
import NameInput from "../../icons/NameIcon.png";
import InputOwn from "../UI/input/InputOwn";
import SurnameInput from "../../icons/SurnameIcon.png";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import RPasswordInput from "../../icons/RPassword.png";
import DateBirthInput from "../../icons/DateBirthIcon.png";
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
                        <img className={classes.IconInput} src={NameInput} alt="БЕРУЛЯ"/>
                    </div>
                    <InputOwn type="text" placeholder="Ім'я"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={SurnameInput} alt="БЕРУЛЯ"/>
                    </div>
                    <InputOwn type="text" placeholder="Прізвище"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={EmailInput} alt="БЕРУЛЯ"/>
                    </div>
                    <InputOwn type="email" placeholder="Електронна пошта"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={PasswordInput} alt="БЕРУЛЯ"/>
                    </div>
                    <InputOwn type="password" placeholder="Пароль"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={RPasswordInput} alt="БЕРУЛЯ"/>
                    </div>
                    <InputOwn type="password" placeholder="Повторіть пароль"/>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={DateBirthInput} alt="БЕРУЛЯ"/>
                    </div>
                    <InputOwn type="text" placeholder="Дата народження" onFocus={(e) => {
                        e.currentTarget.type = "date";
                    }} onBlur={(e) => {
                        e.currentTarget.type = "text";
                        e.currentTarget.placeholder = "Дата народження";
                    }} />
                </div>
            </div>
            <SubmitButtonForm value={"ЗАРЕЄСТРУВАТИСЯ"}/>
        </div>
    );
};


export default RegistrationForm;