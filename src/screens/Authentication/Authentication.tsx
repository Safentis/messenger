import React    from 'react';
import * as Yup from 'yup';
import './Authentication.css';

//* REQUIRES
import AuthenticationForm        from './AuthenticationForm/AuthenticationForm';
import form                      from '../../HOC/form';
import { Fields                } from './Authentication.interface';
import { requestAuthentication } from '../../redux/actionCreators/authentication';

const AUTH_FORM_FIELDS: Fields = {
    email   : '', 
    password: '',
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
    email: Yup
        .string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup
        .string()
        .min(6, 'Not less than 6 symbol')
        .required('Required'),
});

const AuthenticationFormFormik: any = form(
    AuthenticationForm, 
    AUTH_FORM_FIELDS, 
    requestAuthentication, 
    AUTH_VALIDATION_SCHEMA
);

const Authentication = () => {
    return (
        <section className="card page__card">
            <h2 className="title card__title">
                Authentication
            </h2>
            <AuthenticationFormFormik />
        </section>
    );
};

export default Authentication;