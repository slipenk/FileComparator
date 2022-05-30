import { useState, useEffect} from 'react';
import axios from "../../API/axios"
import diffToastError from "../../Toast/ToastError";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/context";
import diffToastInfo from "../../Toast/ToastInfo";


const useLoginForm = (callback, validateInfoEmailPassword) => {
    const [auth, setAuth] = useAuth(useAuth);
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [isForgotPass, setIsForgotPass] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isToolTipEmail, setToolTipEmail] = useState(false);
    const [isToolTipPassword, setToolTipPassword] = useState(false);
    const [BCEmail, setBCEmail] = useState('#FFFCE2');
    const [BCPassword, setBCPassword] = useState('#FFFCE2');
    const LOGIN_URL = "/login";
    const FORGOT_PASSWORD_URL = "/berulia/forgot";
    const GET_USER = "/berulia/getUser";

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
                if (!isForgotPass) {
                     handleSubmitAfterValidation();
                }
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
        [errors] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsForgotPass(false);
        setErrors(validateInfoEmailPassword(values, false));
        setIsSubmitting(true);
    };

    useEffect(() => {
        callback(auth);
    }, [auth]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleForgotPassword = () => {
        setIsForgotPass(true);
        setErrors(validateInfoEmailPassword(values, true));
        if (Object.keys(errors).length === 0) {
            axios({
                url: FORGOT_PASSWORD_URL,
                method: 'POST',
                data: values.email,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }

            }).then(() => {
                diffToastInfo("На вашу електронну пошту надійшов лист з новим паролем. Будь ласка, перегляньте вашу електронну скриньку");
            }
            ).catch((err) => {
                if(err.response.data) {
                    const object = JSON.stringify(err.response.data);
                    const message = object.split(":")[1];
                    diffToastError(message.slice(1, -2));
                } else {
                    diffToastError("Проблема з надсиланням запиту");
                }
            })
        }
    }

    const handleSubmitAfterValidation = () => {
        let formData = new FormData();

        formData.append('username', values.email);
        formData.append('password', values.password);

         axios({
            url: LOGIN_URL,
            method: 'POST',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(() => {
            getUser().then(() => setAuth(true));
        }
        ).catch((err) => {
            if(err.response.data) {
                const object = JSON.stringify(err.response.data);
                const message = object.split(":")[1];

                if (message.slice(0, -1) === "\"User is disabled\"") {
                    diffToastError("Користувач неактивований. Причина: користувач не підтвердив свою електронну пошту");
                } else if (message.slice(0, -1) === "\"Bad credentials\"") {
                    diffToastError("Неправильний логін або пароль");
                }
                else {
                    diffToastError("Неуспішна авторизація");
                }
                setAuth(false);
            } else {
                diffToastError("Неуспішна авторизація");
            }
        })

    }

    const getUser = () => {
        return axios({
            url: GET_USER,
            method: 'POST',
            data: values.email,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        ).catch((err) => {
            if(err.response.data) {
                const object = JSON.stringify(err.response.data);
                const message = object.split(":")[1];
                diffToastError(message.slice(1, -2));
            } else {
                diffToastError("Помилка під час отримання даних користувача");
            }
        })
    }


    return { handleChange, handleSubmit, handleForgotPassword, values, errors, isSubmitting,
        BCEmail, BCPassword, isToolTipEmail, isToolTipPassword};
};

export default useLoginForm;