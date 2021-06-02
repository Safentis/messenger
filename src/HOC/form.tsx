import React         from 'react';
import { useFormik } from 'formik';

const form = (Component: any, initialValues: any, onSubmit: any, validationSchema: any) => (props: any) => {

    //* useFormik is hook 
    //* for handle of the form - fields state
    const formik = useFormik({
        initialValues   : initialValues,
        onSubmit        : onSubmit,
        validationSchema: validationSchema,
    });

    return (
        <Component  
            {...props}
            formik={formik}
        />
    );
};

export default form;