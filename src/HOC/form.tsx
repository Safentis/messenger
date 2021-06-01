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

    const { handleSubmit, handleChange, handleBlur } = formik;
    const { errors, touched, values } = formik;

    return (
        <Component  
            {...props}
            values={values} 
            errors={errors} 
            touched={touched}
            handleSubmit={handleSubmit} 
            handleChange={handleChange} 
            handleBlure={handleBlur}
        />
    );
};

export default form;