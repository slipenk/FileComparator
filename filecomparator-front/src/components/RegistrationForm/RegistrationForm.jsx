import React, {useState} from "react";
import classes from "./RegistrationForm.module.css";
import NameInput from "../../icons/NameIcon.png";
import InputOwn from "../UI/input/InputOwn";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import RPasswordInput from "../../icons/RPassword.png";
import SubmitButtonForm from "../SubmitButtonForm/SubmitButtonForm";
import validate from "./RegistrationValidation.js";
import useForm from "./useForm";
import Tippy from "@tippy.js/react"
import 'tippy.js/dist/tippy.css'


const RegistrationForm = () => {
    const {handleChange, handleSubmit, values, errors, isSubmitting, backgroundColor_} = useForm(validate);


    return (
        <form onSubmit={handleSubmit}>
        <div>
            <div className={classes.col_h}>
                <h1>Реєстрація</h1>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer} style={{backgroundColor: backgroundColor_}}>
                    <div className={classes.alignCenterIMG} >
                        <img className={classes.IconInput} src={NameInput} alt="Прізвисько"/>
                    </div>

                    <Tippy content={errors.username} enabled={isSubmitting}>
                    <InputOwn type="text"
                              placeholder="Прізвисько"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              autoComplete="off"
                              style={{backgroundColor: backgroundColor_}}/>
                    </Tippy>
                </div>

            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={EmailInput} alt="Електронна пошта"/>
                    </div>
                    <Tippy content={errors.email} enabled={isSubmitting}  >
                    <InputOwn type="text"
                              placeholder="Електронна пошта"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              autoComplete="off"/>
                    </Tippy>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={PasswordInput} alt="Пароль"/>
                    </div>
                    <Tippy content={errors.password} enabled={isSubmitting}>
                    <InputOwn type="password"
                              placeholder="Пароль"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              autoComplete="off"/>
                    </Tippy>
                </div>
            </div>
            <div className={classes.col_input}>
                <div className={classes.IMGContainer}>
                    <div className={classes.alignCenterIMG}>
                        <img className={classes.IconInput} src={RPasswordInput} alt="Повторіть пароль"/>
                    </div>
                    <Tippy content={errors.passwordR} enabled={isSubmitting}>
                    <InputOwn type="password"
                              placeholder="Повторіть пароль"
                              name="passwordR"
                              value={values.passwordR}
                              onChange={handleChange}
                              autoComplete="off"/>
                    </Tippy>
                </div>
            </div>
            <SubmitButtonForm value={"ЗАРЕЄСТРУВАТИСЯ"} />
        </div>
        </form>
    );
};


export default RegistrationForm;