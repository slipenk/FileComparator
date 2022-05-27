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
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z]{8,20}$/.test(values.password)) {
            errors.password = "Перевірте правильність написання пароля. Вимоги (мінімум): одна велика літера, одна маленька літера, одна цифра. Довжина пароля: від 8 символів до 20 (лише латиниця)"
        }
    }

    return errors;
}