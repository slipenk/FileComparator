import { useState, useEffect } from 'react';

const useForm = (validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordR: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [BCUsername, setBCUsername] = useState('#FFFCE2');
    const [BCEmail, setBCEmail] = useState('#FFFCE2');
    const [BCPassword, setBCPassword] = useState('#FFFCE2');
    const [BCPasswordR, setBCPasswordR] = useState('#FFFCE2');

    const handleChange = e => {
        setIsSubmitting(false);
        const { name, value } = e.target;
        if (name === 'username') {
            setBCUsername("#FFFCE2")
        } else if (name === 'email') {
            setBCEmail("#FFFCE2")
        } else if (name === 'password') {
            setBCPassword("#FFFCE2")
        } else if (name === 'passwordR') {
            setBCPasswordR("#FFFCE2")
        }
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0) {
                setBCUsername("#FFFCE2")
                setBCEmail("#FFFCE2")
                setBCPassword("#FFFCE2")
                setBCPasswordR("#FFFCE2")
            } else {
                if (errors.username) {
                   setBCUsername("#FD8E90")
                }
                if (errors.email) {
                    setBCEmail("#FD8E90")
                }
                if (errors.password) {
                    setBCPassword("#FD8E90")
                }
                if (errors.passwordR) {
                    setBCPasswordR("#FD8E90")
                }
            }
        },
        [errors]
    );

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    /*useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback();
            }
        },
        [errors]
    ); */


    return { handleChange, handleSubmit, values, errors, isSubmitting,
        BCUsername, BCEmail, BCPassword, BCPasswordR};
};

export default useForm;