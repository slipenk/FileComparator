import { useState, useEffect, useContext} from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from "../../API/axios"

const useLoginForm = (callback, validateInfoEmailPassword) => {
    const { setAuth } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [errorsBack, setErrorsBack] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isToolTipEmail, setToolTipEmail] = useState(false);
    const [isToolTipPassword, setToolTipPassword] = useState(false);
    const [BCEmail, setBCEmail] = useState('#FFFCE2');
    const [BCPassword, setBCPassword] = useState('#FFFCE2');
    const LOGIN_URL = "/login";

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === "email") {
            setBCEmail("#FFFCE2");
            setToolTipEmail(false);
        } else if (name === "password") {
            setBCPassword("#FFFCE2");
            setToolTipPassword(false);
        }
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                setBCEmail("#FFFCE2");
                setBCPassword("#FFFCE2");
                callback();
            } else {
                if (errors.email) {
                    setBCEmail("#FD8E90");
                    setToolTipEmail(true);
                }
                if (errors.password) {
                    setBCPassword("#FD8E90");
                    setToolTipPassword(true);
                }
            }
        },
        [errors]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validateInfoEmailPassword(values));

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({...values.email, ...values.password}),
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ ...values.email, ...values.password, roles, accessToken })
            setIsSubmitting(true);
        } catch (e) {
            if (!e?.response) {
                setErrorsBack("Нема відповіді від сервера")
            } else if (e?.response.status === 400) {
                setErrorsBack("Не надійшла інформація про користувача")
            } else if (e?.response.status === 401) {
                setErrorsBack("Користувач не авторизувався")
            } else {
                setErrorsBack("Неуспішна авторизація")
            }
        }

    };

    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCEmail, BCPassword, isToolTipEmail, isToolTipPassword, errorsBack};
};

export default useLoginForm;