import React from "react";
import classes from './Registration.module.css';
import InputOwn from "../../components/UI/input/InputOwn";
import ButtonOwn from "../../components/UI/button/ButtonOwn";
import Logo from "../../icons/Berulya.png";
import NameInput from "../../icons/NameIcon.png";
import SurnameInput from "../../icons/SurnameIcon.png";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import RPasswordInput from "../../icons/RPassword.png";
import DateBirthInput from "../../icons/DateBirthIcon.png";


const Registration = () => {
    return (
        <div className={classes.RegistrationDiv}>
            <div className={classes.flexDiv}>
                <div className={classes.flexDivCol}>
                    <div className={classes.BerulyaImg}>
                         <img className={classes.ImageDiv} src={Logo} alt="БЕРУЛЯ"/>
                    </div>
                <div className={classes.HBer}>
                    <h1>БЕРУЛЯ</h1>
                </div>
            </div>
            <div>
            <form>
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
                    <div className={classes.col_input + ' ' + classes.col_input_btn}>
                        <ButtonOwn>ЗАРЕЄСТРУВАТИСЯ</ButtonOwn>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </div>
    );

};


export default Registration;