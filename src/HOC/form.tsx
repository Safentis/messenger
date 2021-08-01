import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

//* It's HOC which includes logic of formik, it implements of the hook useFormik
//* We can reuse this logic with other forms, such as registration, authentication and another
//* On input it takes next:
//* Component       : (Wrapped component)
//* initialValues   : object, that contains fields of inputs
//* action          : function, that creating of action
//* validationSchema: object, that validate of inputs
const form =
  (
    Component: any,
    initialValues: object,
    action: any,
    validationSchema: object
  ) =>
  (props: any) => {
    //* We are using hook by name useDispatch
    //* that to take a dispatch function
    const dispatch: any = useDispatch();
    const onSubmit: any = (values: any): void => {
      //* setStatus function for handling status of request
      const setStatus = formik.setStatus;

      //* With dispatch function we sending
      //* input values of form
      //* to the store
      dispatch(
        action({
          values,
          setStatus,
        })
      );
    };

    //* useFormik is hook
    //* for handle of the form - fields state
    const formik: any = useFormik({
      initialValues: initialValues,
      onSubmit: onSubmit,
      validationSchema: validationSchema,
    });

    return <Component {...props} formik={formik} />;
  };

export default form;
