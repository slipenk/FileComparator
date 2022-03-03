import { useState, useEffect } from 'react';

const useLoginForm = (callback, validateInfoEmailPassword) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isToolTipEmail, setToolTipEmail] = useState(false)
    const [isToolTipPassword, setToolTipPassword] = useState(false)
    const [BCEmail, setBCEmail] = useState('#FFFCE2');
    const [BCPassword, setBCPassword] = useState('#FFFCE2');

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === "email") {
            setBCEmail("#FFFCE2")
            setToolTipEmail(false)
        } else if (name === "password") {
            setBCPassword("#FFFCE2")
            setToolTipPassword(false)
        }
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                setBCEmail("#FFFCE2")
                setBCPassword("#FFFCE2")
                callback();
            } else {
                if (errors.email) {
                    setBCEmail("#FD8E90")
                    setToolTipEmail(true)
                }
                if (errors.password) {
                    setBCPassword("#FD8E90")
                    setToolTipPassword(true)
                }
            }
        },
        [errors]
    );

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validateInfoEmailPassword(values));
        setIsSubmitting(true)
    };

    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCEmail, BCPassword, isToolTipEmail, isToolTipPassword};
};

export default useLoginForm;