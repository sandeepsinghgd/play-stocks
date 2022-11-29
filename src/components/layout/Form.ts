import { useState, useEffect, useRef } from "react";

const Form = ({initialValues, onSubmit }:any) => {

    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [onSubmitting, setOnSubmitting] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    const formRendered = useRef(true);

    useEffect(() => {
        if (!formRendered.current) {
            setValues(initialValues);
            setErrors({});
            setTouched({});
            setOnSubmitting(false);
            setOnBlur(false);
        }
        formRendered.current = false;
    }, [initialValues]);

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const handleChange = (event: any) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setValues({ ...values, [name]: value });
    };
    // const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const handleBlur = (event: any) => {
        const { target } = event;
        const { name } = target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors });
    };

    // const handleSubmit = (event: any) => {
        const handleSubmit = (event: any) => {
        if (event) event.preventDefault();
        setErrors({ ...errors });
        onSubmit({ values, errors });
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    };

}

export default Form;