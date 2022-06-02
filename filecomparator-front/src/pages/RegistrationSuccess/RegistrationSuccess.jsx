import React from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesS from "./RegistrationSuccess.module.css";
import LogoName from "../../components/LogoName/LogoName";
import Logo from "../../icons/Berulia.png";
import {Link} from "react-router-dom";

const RegistrationSuccess = () => {

    return (
        <div className={classes.MainDiv}>
            <div className={classes.flexDiv}>
                {localStorage.setItem('IsMenu', 'false')}
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
                <div>
                    <div className={classesS.successStyle}>
                        Щоб завершити реєстрацію, вам потрібно підтвердити вашу електронну пошту. Вам надійшов лист на вказану адресу.
                        Будь ласка, зайдіть та натисніть на посилання. Після цього поверніться назад до цієї сторінки та натисність нижче на посилання "Вхід", щоб перейти на сторінку входу. Дякуємо, що обрали "Берулю".
                    </div>
                    <div className={classes.alreadyReg}>
                        Вже маєте акаунт?
                        <div>
                            <Link to="/login" ><i>Вхід</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
