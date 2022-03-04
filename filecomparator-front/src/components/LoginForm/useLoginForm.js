import { useState, useEffect, useContext} from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from "../../API/axios"
import { toast } from "react-toastify";
import diffToast from "../../Toast/Toast";
import "react-toastify/dist/ReactToastify.css";


const useLoginForm = (callback, validateInfoEmailPassword) => {
    const { setAuth } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
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
                if(isAuth) {
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
        [errors]
    );

    const handleSubmit =  (e) => {
        e.preventDefault();
        setErrors(validateInfoEmailPassword(values));
        setIsSubmitting(true);
    };

    const handleSubmitAfterValidation = async () => {
        try {
            const response = axios({
                url: LOGIN_URL,
                method: "POST",
                data: JSON.stringify({email: values.email, password: values.password}),
                dataType: "json",
                config: {
                    headers: {"Content-Type": "application/json",
                                "Accept": "application/json"},
                    withCredentials: true
                }
            })
            if (!response.ok) {
                diffToast(response.message())
                setIsAuth(false);
                return ;
            }
            setIsAuth(true);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth(values.email, values.password, roles, accessToken)
        } catch (e) {
            setIsAuth(false);
            diffToast("Неуспішна авторизація")
        }
    }


    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCEmail, BCPassword, isToolTipEmail, isToolTipPassword};
};

export default useLoginForm;