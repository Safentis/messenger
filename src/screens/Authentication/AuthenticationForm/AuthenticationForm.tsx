import { FC }   from 'react';
import * as Yup from 'yup';
import { 
    Props, 
    Fields,
    Handlers, 
    Validation 
} from './AuthenticationForm.interface';

//* CSS
import './AuthenticationForm.css';

//* COMPONENTS
import form       from '../../../HOC/form';
import Label      from '../../../components/Label/Label';
import Input      from '../../../components/Input/Input';
import InputError from '../../../components/InputError/InputError';
import Button     from '../../../components/Button/Button';

//* Props for HOC form
const AUTH_FORM_FIELDS: Fields = {
    email   : '', 
    password: '',
};

const AUTH_FORM_SUBMIT = (values: any): void => {
    alert(JSON.stringify(values, null, 2));
}

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
    email: Yup
        .string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup
        .string()
        .min(4, 'Not less than 4 symbol')
        .required('Required'),
});

const AuthenticationForm: FC <Props> = ({formik}) => {
    
    //* name for fields
    const fields: string[] = ['email', 'password'];
    
    //* handleSubmit, func for handle of form submit
    const { handleSubmit    }: Handlers = formik;
    
    //* validation input
    const { errors, touched }: Validation = formik;
    
    //* Fields components
    const FORM_FIELDS: any = (
        fields
            .map((name, index) => 
                <Label className="form-auth__label" key={index}>
                    email
                    <Input 
                        className="form-auth__input" 
                        placeholder={name} 
                        name={name}
                        {...formik.getFieldProps(name)}
                    />
                    <InputError 
                        touched={touched[name]} 
                        error={errors[name]} 
                    />
                </Label>
            )
    );

    return (
        <form className="form" onSubmit={handleSubmit}>
            {FORM_FIELDS}
            <Button className="form-auth__button" type="submit">
                login
            </Button>
        </form>
    );
};

export default form(
    AuthenticationForm, 
    AUTH_FORM_FIELDS, 
    AUTH_FORM_SUBMIT, 
    AUTH_VALIDATION_SCHEMA
);