export default function validateInfo(values) {
    let errors = {}

    if (!values.username.trim()) {
        errors.username = 'Потрібно ввести ваше прізвисько'
    } else if (!/^[A-z][A-z0-9-_]{3,23}$/i.test(values.username)) {
        errors.username = 'Перевірте правильність написання прізвиська. Вимоги: мінімум 4 символи, максимум 24. Перший символ - літера (велика або маленька). Наступні допустимі символи - літера (велика або маленька), цифра, знак підкреслення або дефіс'
    }

    if (!values.email.trim()) {
        errors.email = 'Потрібно ввести вашу електронну пошту'
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(values.email)) {
        errors.email = 'Перевірте правильність написання електронної пошти. Приклад: \"abc@mail.com\"'
    }

    if (!values.password) {
        errors.password = 'Потрібно ввести ваш пароль'
    } else if (!/^[A-z][A-z0-9-_]{3,23}$/i.test(values.password)) {
        errors.password = 'Перевірте правильність написання пароля. Вимоги (мінімум): одна велика літера, одна маленька літера, одна цифра, один спеціальний символ. Довжина пароля: від 8 до 24 символів'
    }

    if (values.passwordR !== values.password) {
        errors.passwordR = 'Паролі повинні співпадати'
    }

    return errors;
}