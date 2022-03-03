import { useState, useEffect, useContext} from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from "../../API/axios"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const useLoginForm = (callback, validateInfoEmailPassword) => {
    const { setAuth } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
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
                data: JSON.stringify({...values.email, ...values.password}),
                config: {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            })
           /* const response = await axios.post(LOGIN_URL, JSON.stringify({...values.email, ...values.password}),
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                });*/
            console.log(response);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ ...values.email, ...values.password, roles, accessToken })
        } catch (e) {
            if (!e?.response) {
                diffToast("Нема відповіді від сервера")
            } else if (e?.response.status === 400) {
                diffToast("Не надійшла інформація про користувача")
            } else if (e?.response.status === 401) {
                diffToast("Користувач не авторизувався")
            } else {
                diffToast("Неуспішна авторизація")
            }
        }
    }

    const diffToast = (message) => {
        toast.error(message, {
            position: "top-center",
            theme: "colored",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCEmail, BCPassword, isToolTipEmail, isToolTipPassword};
};

export default useLoginForm;