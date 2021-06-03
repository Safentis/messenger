import React           from 'react';
import { useFormik   } from 'formik';
import { useDispatch } from 'react-redux';

const form = (Component: any, initialValues: any, action: any, validationSchema: any) => (props: any) => {

    //* We are using hook by name useDispatch
    //* that to take a dispatch function
    const dispatch = useDispatch();
    const onSubmit = (values: any): void => {

        //* With dispatch function we sending
        //* input values of form
        //* to the store
        dispatch(
            action(
                values
            )
        );
    
        // alert(JSON.stringify(values, null, 2));
    }

    //* useFormik is hook 
    //* for handle of the form - fields state
    const formik = useFormik({
        initialValues   : initialValues,
        onSubmit        : onSubmit,
        validationSchema: validationSchema,
    });

    return (
        <Component {...props} formik={formik} />
    );
};

export default form;