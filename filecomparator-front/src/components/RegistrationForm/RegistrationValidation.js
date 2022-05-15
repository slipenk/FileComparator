import validateInfoEmailPassword from "../Validation/Validation";

export default function validateInfo(values) {

    let errors = validateInfoEmailPassword(values, false)

    if (!values.username.trim()) {
        errors.username = "Потрібно ввести ваше прізвисько"
    } else if (!/^[A-z\u0400-\u04FF][A-z\d-_\u0400-\u04FF]{1,23}$/i.test(values.username)) {
        errors.username = "Перевірте правильність написання прізвиська. Вимоги: мінімум 2 символи, максимум 24 (кирилиця та латиниця). Перший символ - літера (велика або маленька) або знак підкреслення. Наступні допустимі символи - літера (велика або маленька), цифра, знак підкреслення або дефіс"
    }

    if (!values.passwordR) {
        errors.passwordR = "Потрібно ввести ваш пароль знову для перевірки"
    } else  if (values.passwordR !== values.password) {
        errors.passwordR = "Паролі повинні співпадати"
    }

    return errors;
}