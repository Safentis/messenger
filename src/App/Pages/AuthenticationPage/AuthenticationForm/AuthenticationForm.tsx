import { FunctionComponent, Fragment } from 'react';
import './AuthenticationForm.css';

//* Library for testing inputs
import * as Yup   from 'yup';

//* HOC witch hook is useFormik
import form       from '../../../../HOC/form';

//* Components
import Button     from '../../../../components/Button/Button';
import Input      from '../../../../components/Input/Input';
import InputError from '../../../../components/InputError/InputError';
import Label      from '../../../../components/Label/Label';

type Props = {
    values: {
        email: string,
        password: string
    },
    errors : any,
    touched: any,
    handleChange: () => any,
    handleSubmit: () => any,
    handleBlur  : () => any,
};

//* Fields for HOC component with formik
const AUTH_FORM_FIELDS = {
    email   : '', 
    password: '',
};

const AUTH_FORM_SUBMIT = (values: any): void => {
    alert(JSON.stringify(values, null, 2));
}

const AUTH_VALIDATION_SCHEMA = Yup.object({
    email: Yup
        .string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup
        .string()
        .min(4, 'Not less than 4 symbol')
        .required('Required'),
});

const AuthenticationForm: FunctionComponent <Props> = ({values, errors, touched, handleSubmit, handleChange, handleBlur}) => {

    //* All fields of the auth-form,
    //* data comes from state of HOC by name "form"
    const FORM_AUTH_FIELDS = (
        Object
            .entries(values)
            .map(([key, value], index) =>
                <Fragment key={index}>
                    <Label className="form-auth__label" text={key}>
                        <Input className="form-auth__input"
                            type        ={key} 
                            name        ={key} 
                            id          ={key} 
                            value       ={value}
                            placeholder ={key}
                            onChange    ={handleChange} 
                            onBlur      ={handleBlur}
                        />
                    </Label>
                    {
                        (touched[key] && errors[key])
                            ? <InputError message={errors[key]} />
                            : null
                    }
                </Fragment>
            )
    );

    const FORM_AUTH_BUTTON = (
        <Button className="form-auth__button" type="submit">
            Login
        </Button>
    ); 

    return (
        <>
            <form className="form form-auth" onSubmit={handleSubmit}>
                {FORM_AUTH_FIELDS}
                {FORM_AUTH_BUTTON}    
            </form>
        </>
    );
}

export default form(AuthenticationForm, AUTH_FORM_FIELDS, AUTH_FORM_SUBMIT, AUTH_VALIDATION_SCHEMA);