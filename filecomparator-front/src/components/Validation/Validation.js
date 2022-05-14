export default function validateInfoEmailPassword(values, isForgotPass) {
    let errors = {}

    if (!values.email.trim()) {
        errors.email = "Потрібно ввести вашу електронну пошту"
    } else if (values.email.length > 254) {
        errors.email = "Максимальна довжина електронної пошти - 254 символи"
    } else if (!/^[a-zA-Z\d_.+-]+@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/i.test(values.email)) {
        errors.email = "Перевірте правильність написання електронної пошти. Приклад: \"abc@mail.com\" (лише латиниця)"
    }

    if (!isForgotPass) {
        if (!values.password) {
            errors.password = "Потрібно ввести ваш пароль"
        } else if (!/^[A-z][A-z\d-_]{3,23}$/i.test(values.password)) {
            errors.password = "Перевірте правильність написання пароля. Вимоги (мінімум): одна велика літера, одна маленька літера, одна цифра, один спеціальний символ. Довжина пароля: від 8 до 24 символів (лише латиниця)"
        }
    }

    return errors;
}