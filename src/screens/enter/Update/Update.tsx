import React, { FC } from 'react';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from 'reactstrap';

import form from '../../../HOC/form';
import Card from '../../../layouts/Card';
import Form from '../../../layouts/Form';

import './Update.css';
import { Props, Fields } from './Update.interface';
import { requestUpdatePassword } from '../../../redux/actionCreators/update';
import { ButtonParams, FieldsParams, FormLink } from '../../../layouts/Form/index.interface';
import {
  AUTHENTICATION_ROUTE,
  PASSWORD_VALIDATION_MESSAGE,
  REGISTRATION_ROUTE,
  REG_EXP_PASSWORD,
} from '../../../utils/consts';

//* PROPERTY FOR HOC form
//* which set up a formik
const UPDATE_FORM_FIELDS: Fields = {
  password: '',
  'password repeat': '',
};

const UPDATE_VALIDATION_SCHEMA: object = Yup.object({
  password: Yup.string()
    .required('Required')
    .min(8, 'Not less than 8 symbol')
    .matches(REG_EXP_PASSWORD, PASSWORD_VALIDATION_MESSAGE),
  'password repeat': Yup.string()
    .required('Required')
    .min(8, 'Not less than 8 symbol')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .matches(REG_EXP_PASSWORD, PASSWORD_VALIDATION_MESSAGE),
});

const UpdateForm = form(Form, UPDATE_FORM_FIELDS, requestUpdatePassword, UPDATE_VALIDATION_SCHEMA);

const Update: FC<Props> = (): React.ReactElement => {
  //* --------------------------------------------------
  //* fields props for Form components, that is template
  const fields: FieldsParams[] = [
    { name: 'password', type: 'password' },
    { name: 'password repeat', type: 'password' },
  ];

  //* Button registration
  const buttonParams: ButtonParams = {
    text: 'Update password',
    icon: faKey,
  };

  const links: FormLink[] = [
    { to: AUTHENTICATION_ROUTE, content: 'Authentication' },
    { to: REGISTRATION_ROUTE, content: 'Registration' },
  ];

  return (
    <Card className="update" title="Update">
      <UpdateForm fields={fields} buttonParams={buttonParams} />
      <div className="card-links update__links">
        {links.map(
          ({ to, content }: FormLink, index: number): React.ReactNode => (
            <Link className="card-link update__link" key={index} to={to}>
              <Button className="card-link" color="link" size="lg" outline>
                {content}
              </Button>
            </Link>
          ),
        )}
      </div>
    </Card>
  );
};

export default Update;
