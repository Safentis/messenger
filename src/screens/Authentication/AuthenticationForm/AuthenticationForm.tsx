import { FC, Fragment } from 'react';
import * as Yup from 'yup';
import { Props, Fields, Handlers, Validation } from './AuthenticationForm.interface';
import './AuthenticationForm.css';

//* COMPONENTS
import form       from '../../../HOC/form';
import Label      from '../../../components/Label/Label';
import Input      from '../../../components/Input/Input';
import InputError from '../../../components/InputError/InputError';
import Button     from '../../../components/Button/Button';
import RequestStatus from '../../../components/RequestStatus/RequestStatus';

//* Action
import { requestAuthentication as AUTH_REQUEST_ACTION } from '../../../redux/actionCreators/authentication';

//* Props for HOC form
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

const AuthenticationForm: FC <Props> = ({formik}: any): any => {
    
    //* Validation input
    const { errors, touched, status }: Validation = formik;
    
    //* HandleSubmit, func for handle of form submit
    const { handleSubmit }: Handlers = formik;
    
    //* Names for 'Form fields'
    const fields: string[] = ['email', 'password'];
    
    //* 'Form fields'
    const FORM_FIELDS: any = (
        fields
            .map((name, index) => 
                <Fragment key={index}>
                    <Label className="form-auth__label">
                        {name}
                        <Input 
                            className="form-auth__input" 
                            placeholder={name} 
                            name={name}
                            {...formik.getFieldProps(name)}
                        />
                    </Label>
                    <InputError 
                        touched={touched[name]} 
                        error={errors[name]} 
                    />
                </Fragment>
            )
    );

    const FORM_BUTTON: any = (
        <Button className="form-auth__button" type="submit">
            login
        </Button>
    );

    const FORM_STATUS: any = (
        <RequestStatus status={status}/>
    );

    return (
        <>
            {FORM_STATUS}
            <form className="form" onSubmit={handleSubmit}>
                {FORM_FIELDS}
                {FORM_BUTTON}
            </form>
        </>
    );
};

export default form(
    AuthenticationForm, 
    AUTH_FORM_FIELDS, 
    AUTH_REQUEST_ACTION, 
    AUTH_VALIDATION_SCHEMA
);