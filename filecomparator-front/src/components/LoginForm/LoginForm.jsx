import React from "react";
import InputOwn from "../UI/input/InputOwn";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import ForgotPassword from "../../icons/ForgotPassword.png";
import SubmitButtonForm from "../SubmitButtonForm/SubmitButtonForm";
import classes from "../../FormStyle/FormStyle.module.css";
import validateInfoEmailPassword from "../Validation/Validation";
import useLoginForm from "./useLoginForm";
import Tippy from "@tippy.js/react"
import "tippy.js/dist/tippy.css"
import { ToastContainer } from "react-toastify";

const LoginForm = ({submitForm}) => {
    const {handleChange, handleSubmit, handleForgotPassword, values, errors, BCEmail, BCPassword,
        isToolTipEmail, isToolTipPassword} = useLoginForm(submitForm, validateInfoEmailPassword);

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div>
                <div className={classes.col_h_Login + " " + classes.col_h}>
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
                    <div className={classes.IconInput}/>
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
                    <div className={classes.IconForgot}>
                        <Tippy placement="right" content="Забули пароль?">
                            <img className={classes.IconInput + " " + classes.IconForgotPassword} src={ForgotPassword} onClick={handleForgotPassword} alt="Забули пароль?"/>
                        </Tippy>
                    </div>
                </div>
                <div className={classes.SubmitButtonFormLogin}>
                    <SubmitButtonForm value={"УВІЙТИ"} />
                </div>
            </div>
            <ToastContainer className={classes.toast}/>
        </form>
    );
};


export default LoginForm;