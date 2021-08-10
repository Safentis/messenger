import { FC } from 'react';
import { Link } from 'react-router-dom';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import form from '../../../HOC/form';
import Card from '../../../layouts/Card/index';
import Form from '../../../layouts/Form';
import Button from '../../../components/Button/Button';
import { requestAuthentication } from '../../../redux/actionCreators/authentication';
import { requestGoogle } from '../../../redux/actionCreators/registration';

import './Authentication.css';
import { Fields } from './Authentication.interface';
import { REGISTRATION_ROUTE, RESTORE_PASSWORD_ROUTE } from '../../../utils/consts';
import { ButtonParams, FieldsParams, FormLink } from '../../../layouts/Form/index.interface';

//* PROPERTY FOR HOC form
//* which set up a formik
const AUTH_FORM_FIELDS: Fields = {
  email: '',
  password: '',
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(8, 'Not less than 8 symbol').required('Required'),
});

const AuthenticationForm = form(
  Form,
  AUTH_FORM_FIELDS,
  requestAuthentication,
  AUTH_VALIDATION_SCHEMA,
);

const Authentication: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const signWithGoogle = (): void => {
    dispatch(requestGoogle());
  };

  //* --------------------------------------------------
  //* Props for Form component
  const fields: FieldsParams[] = [
    { name: 'email', type: 'text' },
    { name: 'password', type: 'password' },
  ];

  //* Button
  const buttonParams: ButtonParams = {
    text: 'Enter',
    icon: faSignInAlt,
  };

  const links: FormLink[] = [
    { to: REGISTRATION_ROUTE, content: 'Registration' },
    { to: RESTORE_PASSWORD_ROUTE, content: 'Restore' },
  ];

  // RWg2d9S4RgFB6fV
  return (
    <Card className="authentication" title="Authentication">
      <AuthenticationForm fields={fields} buttonParams={buttonParams} />
      <div className="authentication__socials">
        <Button
          className="card-button authentication__button"
          onClick={signWithGoogle}
          type="submit"
        >
          sign with google
        </Button>
      </div>
      <div className="card-links authentication__links">
        {links.map(
          ({ to, content }: FormLink, index: number): React.ReactNode => (
            <Link className="card-link authentication__link" key={index} to={to}>
              {content}
            </Link>
          ),
        )}
      </div>
    </Card>
  );
};

export default Authentication;
