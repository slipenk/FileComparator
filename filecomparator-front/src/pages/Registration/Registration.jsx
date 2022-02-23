import React from "react";
import classes from './Registration.module.css';
import InputOwn from "../../components/UI/input/InputOwn";
import ButtonOwn from "../../components/UI/button/ButtonOwn";


const Registration = () => {
    return (
        <div className={classes.RegistrationDiv}>
            <form>
                <div className={classes.container}>
                        <div className={classes.col_h}>
                            <h1>Реєстрація</h1>
                        </div>
                        <div className={classes.col_input}>
                            <InputOwn type="text" placeholder="Ім'я"/>
                        </div>
                        <div className={classes.col_input}>
                            <InputOwn type="text" placeholder="Прізвище"/>
                        </div>
                        <div className={classes.col_input+ ' ' + classes.col_input_btn}>
                            <ButtonOwn>ЗАРЕЄСТРУВАТИСЯ</ButtonOwn>
                        </div>
                </div>
            </form>
        </div>
    );
};

export default Registration;