import {useState, useEffect} from 'react';
import axios from "../../API/axios";
import diffToast from "../../Toast/Toast";
import "react-toastify/dist/ReactToastify.css";
import diffToastSuccess from "../../Toast/ToastSuccess";

const useRegistrationForm = (callback, validate, isRegistration) => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordR: ""
    });
    const [errors, setErrors] = useState({});
    const [isReg, setIsReg] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isToolTipUsername, setToolTipUsername] = useState(false);
    const [isToolTipEmail, setToolTipEmail] = useState(false);
    const [isToolTipPassword, setToolTipPassword] = useState(false);
    const [isToolTipPasswordR, setToolTipPasswordR] = useState(false);
    const [BCUsername, setBCUsername] = useState('#FFFCE2');
    const [BCEmail, setBCEmail] = useState('#FFFCE2');
    const [BCPassword, setBCPassword] = useState('#FFFCE2');
    const [BCPasswordR, setBCPasswordR] = useState('#FFFCE2');
    const REGISTRATION_URL = "/berulia/registration/register";
    const UPDATE_USER_DATA_URL = "/berulia/update";

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === "username") {
            setBCUsername("#FFFCE2")
            setToolTipUsername(false)
        } else if (name === "email") {
            setBCEmail("#FFFCE2")
            setToolTipEmail(false)
        } else if (name === "password") {
            setBCPassword("#FFFCE2")
            setToolTipPassword(false)
        } else if (name === "passwordR") {
            setBCPasswordR("#FFFCE2")
            setToolTipPasswordR(false)
        }
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                console.log("Mane")
                setBCUsername("#FFFCE2");
                setBCEmail("#FFFCE2");
                setBCPassword("#FFFCE2");
                setBCPasswordR("#FFFCE2");
                if(isRegistration) {
                    handleSubmitAfterValidation().then();
                } else {
                    updateUserData().then();
                }
            } else {
                if (errors.username) {
                    setBCUsername("#FD8E90");
                    setToolTipUsername(true);
                }
                if (errors.email) {
                    setBCEmail("#FD8E90");
                    setToolTipEmail(true);
                }
                if (errors.password) {
                    setBCPassword("#FD8E90");
                    setToolTipPassword(true);
                }
                if (errors.passwordR) {
                    setBCPasswordR("#FD8E90");
                    setToolTipPasswordR(true);
                }
            }
        },
        [errors] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        callback(isReg);
    }, [isReg]); // eslint-disable-line react-hooks/exhaustive-deps


    const handleSubmitAfterValidation = async () => {
        axios({
            url: REGISTRATION_URL,
            method: 'POST',
            data: JSON.stringify({username: values.username, email: values.email, password: values.password}),
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(() => {
                setIsReg(true);
            }
        ).catch((err) => {
            if(err.response.data) {
                const object = JSON.stringify(err.response.data);
                const message = object.split(":")[1];
                setIsReg(false);
                diffToast(message.slice(1, -2));
            } else {
                diffToast("Неуспішна реєстрація");
            }
        })
    }

    const updateUserData = async () => {
       const text  = localStorage.getItem('user');
       const object = JSON.parse(text);

       console.log("dys")

        axios({
            url: UPDATE_USER_DATA_URL,
            method: 'POST',
            data: JSON.stringify({emailNew: values.email, usernameNew: values.username, passwordNew: values.password, usernameOld: object.username, passwordOld: object.password, emailOld: object.email, ID: object.id}),
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((response) => {
            if(response.data === "SUCCESS") {
                diffToastSuccess("Дані успішно оновлені");
            } else {
                diffToast("Проблема з оновленням даних");
            }
        }
        ).catch(() => {
            diffToast("Проблема з оновленням даних");
        })

    }

    return { handleChange, handleSubmit, values, errors,
        BCUsername, BCEmail, BCPassword, BCPasswordR, isToolTipUsername,
        isToolTipEmail, isToolTipPassword, isToolTipPasswordR};
};

export default useRegistrationForm;