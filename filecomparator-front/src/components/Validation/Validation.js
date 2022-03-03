export default function validateInfoEmailPassword(values) {
    let errors = {}

    if (!values.email.trim()) {
        errors.email = "Потрібно ввести вашу електронну пошту"
    } else if (values.email.length > 254) {
        errors.email = "Максимальна довжина електронної пошти - 254 символи"
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(values.email)) {
        errors.email = "Перевірте правильність написання електронної пошти. Приклад: \"abc@mail.com\" (лише латиниця)"
    }

    if (!values.password) {
        errors.password = "Потрібно ввести ваш пароль"
    } else if (!/^[A-z][A-z0-9-_]{3,23}$/i.test(values.password)) {
        errors.password = "Перевірте правильність написання пароля. Вимоги (мінімум): одна велика літера, одна маленька літера, одна цифра, один спеціальний символ. Довжина пароля: від 8 до 24 символів (лише латиниця)"
    }

    return errors;
}