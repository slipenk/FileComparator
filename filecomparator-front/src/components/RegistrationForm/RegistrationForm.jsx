import React from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import NameInput from "../../icons/NameIcon.png";
import InputOwn from "../UI/input/InputOwn";
import EmailInput from "../../icons/EmailIcon.png";
import PasswordInput from "../../icons/PasswordIcon.png";
import RPasswordInput from "../../icons/RPassword.png";
import SubmitButtonForm from "../SubmitButtonForm/SubmitButtonForm";
import validate from "./RegistrationValidation.js";
import useRegistrationForm from "./useRegistrationForm";
import Tippy from "@tippy.js/react"
import 'tippy.js/dist/tippy.css'
import { ToastContainer } from "react-toastify";


const RegistrationForm = ({submitForm, isRegistration}) => {
    const {handleChange, handleSubmit, values, errors, BCUsername, BCEmail, BCPassword, BCPasswordR, isToolTipUsername,
        isToolTipEmail, isToolTipPassword, isToolTipPasswordR} = useRegistrationForm(submitForm, validate, isRegistration);

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div>
                <div className={classes.col_h}>
                    <div className={classes.divRow}>
                        {isRegistration ? <div></div> : <div className={classes.alignButton}></div>}
                        <h1>{isRegistration ? <div>Реєстрація</div> : <div>Особистий кабінет</div>}</h1>
                    </div>
                </div>
                <div className={classes.divRow}>
                    {isRegistration ? <div></div> : <div className={classes.alignTexts}></div>}
                    {isRegistration ? <div></div> : <div className={classes.namesForPersonalAcc}>Змінення облікових даних</div>}
                </div>
                <div className={classes.col_input}>
                    {isRegistration ? <div></div> : <div className={classes.namesForPersonalAcc}>Прізвисько:</div>}
                    <div className={classes.IMGContainer} style={{backgroundColor: BCUsername}}>
                        <div className={classes.alignCenterIMG} >
                            <img className={classes.IconInput} src={NameInput} alt="Прізвисько"/>
                        </div>
                        <Tippy content={errors.username ? errors.username : ""} enabled={isToolTipUsername}>
                            <InputOwn type="text"
                              placeholder="Прізвисько"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              autoComplete="off"
                              style={{backgroundColor: BCUsername}}/>
                        </Tippy>
                    </div>
                </div>
                <div className={classes.col_input}>
                    {isRegistration ? <div></div> :
                        <div className={classes.namesForPersonalAcc}>Електронна пошта:</div>}
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
                    {isRegistration ? <div></div> : <div className={classes.namesForPersonalAcc}>Пароль:</div>}
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
                <div className={classes.col_input}>
                    {isRegistration ? <div></div> : <div className={classes.namesForPersonalAcc}>Повторіть пароль:</div>}
                    <div className={classes.IMGContainer} style={{backgroundColor: BCPasswordR}}>
                        <div className={classes.alignCenterIMG}>
                            <img className={classes.IconInput} src={RPasswordInput} alt="Повторіть пароль"/>
                        </div>
                        <Tippy content={errors.passwordR ? errors.passwordR : ""} enabled={isToolTipPasswordR}>
                            <InputOwn type="password"
                              placeholder="Повторіть пароль"
                              name="passwordR"
                              value={values.passwordR}
                              onChange={handleChange}
                              autoComplete="off"
                              style={{backgroundColor: BCPasswordR}}/>
                        </Tippy>
                    </div>
                </div>
                <div className={classes.divRow}>
                    {isRegistration ? <div></div> : <div className={classes.alignButton}></div> }
                    {isRegistration ? <SubmitButtonForm value={"ЗАРЕЄСТРУВАТИСЯ"} /> : <SubmitButtonForm value={"ЗМІНИТИ"} />}
                </div>
            </div>
            <ToastContainer className={classes.toast}/>
        </form>
    );
};


export default RegistrationForm;