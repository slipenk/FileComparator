import { useState, useEffect } from 'react';

const useForm = (validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordR: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [backgroundColor_, setBackgroundColor] = useState("");

    const handleChange = e => {
        setIsSubmitting(false);
        setBackgroundColor('#FFFCE2')
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0) {
                setBackgroundColor('#FFFCE2')
            } else {
                setBackgroundColor('#FF0000')
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

    return { handleChange, handleSubmit, values, errors, isSubmitting, backgroundColor_};
};

export default useForm;