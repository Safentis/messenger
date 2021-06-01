import React from 'react';
import './AuthenticationPage.css';
import AuthenticationForm from './AuthenticationForm/AuthenticationForm';

const AuthenticationPage = () => {
    return (
        <>
            <section className="card page__card">
                <h2 className="title page__title">
                    Authentication
                </h2>
                <AuthenticationForm />
            </section>
        </>
    )
}

export default AuthenticationPage;