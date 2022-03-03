import React from "react";
import InputOwn from "../UI/input/InputOwn";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import SubmitButtonForm from "../SubmitButtonForm/SubmitButtonForm";
import classes from "../../FormStyle/FormStyle.module.css";
import validateInfoEmailPassword from "../Validation/Validation";
import useLoginForm from "./useLoginForm";
import Tippy from "@tippy.js/react"
import 'tippy.js/dist/tippy.css'

const LoginForm = ({submitForm}) => {
    const {handleChange, handleSubmit, values, errors, BCEmail, BCPassword,
        isToolTipEmail, isToolTipPassword, errorsBack} = useLoginForm(submitForm, validateInfoEmailPassword);

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div>
                <div className={classes.col_h}>
                    <h1>Вхід</h1>
                </div>
                <div className={classes.col_input}>
                    <div className={classes.IMGContainer} style={{backgroundColor: BCEmail}}>
                        <div className={classes.alignCenterIMG}>
                            <img className={classes.IconInput} src={EmailInput} alt="Електронна пошта"/>
                        </div>
                        <Tippy content={errors.email ? errors.email : ""} enabled={isToolTipEmail}>
                            <InputOwn type="text"
                                      placeholder="Електронна пошта"
                                      name="email"
                                      value={values.email}
                                      onChange={handleChange}
                                      autoComplete="off"
                                      style={{backgroundColor: BCEmail}}/>
                        </Tippy>
                    </div>
                </div>
                <div className={classes.col_input}>
                    <div className={classes.IMGContainer} style={{backgroundColor: BCPassword}}>
                        <div className={classes.alignCenterIMG}>
                            <img className={classes.IconInput} src={PasswordInput} alt="Пароль"/>
                        </div>
                        <Tippy content={errors.password ? errors.password : ""} enabled={isToolTipPassword}>
                            <InputOwn type="password"
                                      placeholder="Пароль"
                                      name="password"
                                      value={values.password}
                                      onChange={handleChange}
                                      autoComplete="off"
                                      style={{backgroundColor: BCPassword}}/>
                        </Tippy>
                    </div>
                </div>
                <SubmitButtonForm value={"УВІЙТИ"} />
            </div>
        </form>
    );
};


export default LoginForm;