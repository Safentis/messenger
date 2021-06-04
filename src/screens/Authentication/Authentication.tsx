import React from 'react';
import './Authentication.css';

import AuthenticationForm  from './AuthenticationForm/AuthenticationForm';

const Authentication = () => {
    return (
        <section className="card page__card">
            <h2 className="title card__title">
                Authentication
            </h2>
            <AuthenticationForm />
        </section>
    );
};

export default Authentication;