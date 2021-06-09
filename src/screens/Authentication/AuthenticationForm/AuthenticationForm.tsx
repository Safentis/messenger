import { FC, Fragment                } from 'react';
import { Props, Handlers, Validation } from './AuthenticationForm.interface';
import { FontAwesomeIcon             } from '@fortawesome/react-fontawesome';
import { faSignInAlt                 } from '@fortawesome/free-solid-svg-icons';
import './AuthenticationForm.css';

//* COMPONENTS
import RequestStatus from '../../../components/RequestStatus/RequestStatus';
import Label         from '../../../components/Label/Label';
import Input         from '../../../components/Input/Input';
import ErrorMessage  from '../../../components/ErrorMessage/ErrorMessage';
import Button        from '../../../components/Button/Button';

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
                    <ErrorMessage 
                        touched={touched[name]} 
                        error={errors[name]} 
                    />
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

    const FORM_REQUEST_STATUS: any = (
        //* If status true
        //* we view message about access login
        //* else we are seeing error message
        (status !== undefined)  
            ? (status)
                ? <RequestStatus 
                    className="form-auth__status" 
                    status={status}
                  >
                    Access is allowed, 
                    wellcome!
                  </ RequestStatus>
                  
                : <RequestStatus 
                    className="form-auth__status" 
                    status={status}
                  >
                    User was not found, 
                    please cheking email or password!  
                  </ RequestStatus>
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