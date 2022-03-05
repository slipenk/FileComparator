import {useState, useEffect} from 'react';
import axios from "../../API/axios";
import diffToast from "../../Toast/Toast";
import "react-toastify/dist/ReactToastify.css";

const useRegistrationForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: "slipenk",
        email: "slipenk92@gmail.com",
        password: "CERcer12_",
        passwordR: "CERcer12_"
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
                setBCUsername("#FFFCE2");
                setBCEmail("#FFFCE2");
                setBCPassword("#FFFCE2");
                setBCPasswordR("#FFFCE2");
                handleSubmitAfterValidation().then();
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
        if(isReg) {
            callback();
        }
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
        }).then(
            setIsReg(true)
        ).catch(() => {
            setIsReg(false);
            diffToast("Неуспішна реєстрація");
        })

           // const accessToken = response?.data?.accessToken;
           // const roles = response?.data?.roles;
           // setAuth(values.email, values.password, roles, accessToken)
    }


    return { handleChange, handleSubmit, values, errors,
        BCUsername, BCEmail, BCPassword, BCPasswordR, isToolTipUsername,
        isToolTipEmail, isToolTipPassword, isToolTipPasswordR};
};

export default useRegistrationForm;