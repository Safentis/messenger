import React, { FC, Fragment         } from 'react';
import { Props, Handlers, Validation } from './AuthenticationForm.interface';
import { FontAwesomeIcon             } from '@fortawesome/react-fontawesome';
import { faSignInAlt                 } from '@fortawesome/free-solid-svg-icons';
import './AuthenticationForm.css';

//* COMPONENTS
import Label          from '../../../components/Label/Label';
import Input          from '../../../components/Input/Input';
import Button         from '../../../components/Button/Button';
import ErrorMessage   from '../../../components/ErrorMessage/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage/SuccessMessage';

const AuthenticationForm: FC <Props> = ({formik}): any => {
    //* With destructuring we are taking object
    //* errors : object that contains error-messages
    //* touched: object which marks the fields visited
    //* status : boolean value, if status true, that request was successful
    //* else rejected
    const { errors, touched, status }: Validation = formik;
    
    //* handleSubmit is function which handles form submit
    //* if all fields filled we can to do the form submit
    const { handleSubmit            }: Handlers   = formik;

    //* fields is variable, that equal fields of formik component
    //* and provide names for form fields
    const fields: string[] = ['email', 'password'];
    

    // const handleKeyPress: any = (event: React.KeyboardEvent): void => {
        
    //     if (event.code === 'Enter') {
    //         handleSubmit();
    //     } 
    // }

    const FORM_FIELDS: any = (
        fields
            .map((name, index) => 
                <Fragment key={index}>
                    <Label className="label-auth form-auth__label">
                        {name}
                        <Input 
                            className="input-auth form-auth__input" 
                            placeholder={name} 
                            name={name}
                            {...formik.getFieldProps(name)}
                        />
                    </Label>
                    {
                        (touched[name] && errors[name])
                            ? <ErrorMessage>
                                {errors[name]}
                              </ ErrorMessage>
                            : null
                    }
                </Fragment>
            )
    );

    const FORM_BUTTON: any = (
        <Button 
            className="button-auth form-auth__button" 
            type="submit"
        >
            Login
            <FontAwesomeIcon 
                className="button__icon" 
                icon={faSignInAlt}
            /> 
        </Button>
    );

    const SUCCESS_MESSAGE = (
        <SuccessMessage className="form-auth__status">
            Access is allowed, 
            wellcome!
        </ SuccessMessage>
    );

    const ERROR_MESSAGE = (
        <ErrorMessage className="form-auth__status">
            User was not found, 
            please cheking email or password!  
        </ ErrorMessage>
    );

    const FORM_REQUEST_STATUS: any = (
        //* If status true
        //* we view message about access login
        //* else we are seeing error message
        (status !== undefined)  
            ? (status)
                ? SUCCESS_MESSAGE
                : ERROR_MESSAGE
            : null
    );

    return (
        <form className="form" onSubmit={handleSubmit}>
            {FORM_FIELDS}
            {FORM_BUTTON}
            {FORM_REQUEST_STATUS}
        </form>
    );
};

export default AuthenticationForm; 