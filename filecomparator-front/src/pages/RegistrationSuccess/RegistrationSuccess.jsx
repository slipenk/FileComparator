import React from "react";
import classes from './RegistrationSuccess.module.css';

const RegistrationSuccess = () => {

    return (
        <div className={classes.successStyle}>
                Щоб завершити реєстрацію, вам потрібно підтвердити вашу електронну пошту. Вам надійшов лист на вказану адресу.
                Будь ласка, зайдіть та натисніть на посилання. Після цього поверніться назад до цієї сторінки та натисність нижче на посилання "Вхід", щоб перейти на сторінку входу. Дякуємо, що обрали "Берулю".
        </div>
    );
};

export default RegistrationSuccess;
