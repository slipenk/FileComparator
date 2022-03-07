import { useState, useEffect} from 'react';
import axios from "../../API/axios"
import diffToast from "../../Toast/Toast";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/context";


const useLoginForm = (callback, validateInfoEmailPassword) => {
    const [auth, setAuth] = useAuth(useAuth);
    const [values, setValues] = useState({
        email: "slipenk92@gmail.com",
        password: "CERcer12_"
    });
    const [errors, setErrors] = useState({});
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
                handleSubmitAfterValidation().then();
                if(auth) {
                    callback();
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
        setErrors(validateInfoEmailPassword(values));
        setIsSubmitting(true);
    };

    const handleSubmitAfterValidation = async () => {
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
            setAuth(true);
        }
        ).catch((err) => {
            const object = JSON.stringify(err.response.data);
            const message = object.split(":")[1].split(",")[0];

            if(message === "\"User is disabled\"") {
                diffToast("Користувач неактивований. Причина: користувач не підтвердив свою електронну пошту");
            } else {
                diffToast("Неуспішна авторизація");
            }
            setAuth(false);
        })
    }


    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCEmail, BCPassword, isToolTipEmail, isToolTipPassword};
};

export default useLoginForm;