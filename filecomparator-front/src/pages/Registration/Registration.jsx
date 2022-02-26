import React from "react";
import classes from './Registration.module.css';
import InputOwn from "../../components/UI/input/InputOwn";
import ButtonOwn from "../../components/UI/button/ButtonOwn";
import Logo from "./Berulya.png";


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
                        <InputOwn type="text" placeholder="Ім'я"/>
                    </div>
                    <div className={classes.col_input}>
                        <InputOwn type="text" placeholder="Прізвище"/>
                    </div>
                    <div className={classes.col_input}>
                        <InputOwn type="email" placeholder="Електронна пошта"/>
                    </div>
                    <div className={classes.col_input}>
                        <InputOwn type="password" placeholder="Пароль"/>
                    </div>
                    <div className={classes.col_input}>
                        <InputOwn type="password" placeholder="Повторіть пароль"/>
                    </div>
                    <div className={classes.col_input}>
                        <InputOwn type="date" placeholder="Дата народження"/>
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