import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordR: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isToolTipUsername, setToolTipUsername] = useState(false)
    const [isToolTipEmail, setToolTipEmail] = useState(false)
    const [isToolTipPassword, setToolTipPassword] = useState(false)
    const [isToolTipPasswordR, setToolTipPasswordR] = useState(false)
    const [BCUsername, setBCUsername] = useState('#FFFCE2');
    const [BCEmail, setBCEmail] = useState('#FFFCE2');
    const [BCPassword, setBCPassword] = useState('#FFFCE2');
    const [BCPasswordR, setBCPasswordR] = useState('#FFFCE2');

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
                setBCUsername("#FFFCE2")
                setBCEmail("#FFFCE2")
                setBCPassword("#FFFCE2")
                setBCPasswordR("#FFFCE2")
                callback();
            } else {
                if (errors.username) {
                    setBCUsername("#FD8E90")
                    setToolTipUsername(true)
                }
                if (errors.email) {
                    setBCEmail("#FD8E90")
                    setToolTipEmail(true)
                }
                if (errors.password) {
                    setBCPassword("#FD8E90")
                    setToolTipPassword(true)
                }
                if (errors.passwordR) {
                    setBCPasswordR("#FD8E90")
                    setToolTipPasswordR(true)
                }
            }
        },
        [errors]
    );

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
    };

    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCUsername, BCEmail, BCPassword, BCPasswordR, isToolTipUsername,
        isToolTipEmail, isToolTipPassword, isToolTipPasswordR};
};

export default useForm;