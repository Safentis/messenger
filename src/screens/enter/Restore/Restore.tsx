import { FC } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

import form from '../../../HOC/form';
import Form from '../../../layouts/Form';
import Card from '../../../layouts/Card';
import { requestRestorePassword } from '../../../redux/actionCreators/restore';

import './Restore.css';
import { Fields, Props } from './Restore.interface';
import { AUTHENTICATION_ROUTE, REGISTRATION_ROUTE } from '../../../utils/consts';
import { ButtonParams, FieldsParams, FormLink } from '../../../layouts/Form/index.interface';

//* PROPERTY FOR HOC form
//* which set up a formik
const RESTORE_FORM_FIELDS: Fields = {
  email: '',
};

const RESTORE_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
});

const RestoreForm = form(
  Form,
  RESTORE_FORM_FIELDS,
  requestRestorePassword,
  RESTORE_VALIDATION_SCHEMA,
);

const Restore: FC<Props> = (): React.ReactElement => {
  //* --------------------------------------------------
  //* fields props for Form components, that is template
  const fields: FieldsParams[] = [{ name: 'email', type: 'text' }];

  //* Button reset
  const buttonParams: ButtonParams = {
    text: 'Restore',
    icon: faEnvelope,
  };

  const links: FormLink[] = [
    { to: AUTHENTICATION_ROUTE, content: 'Authentication' },
    { to: REGISTRATION_ROUTE, content: 'Registration' },
  ];

  return (
    <Card className="restore" title="Restore">
      <RestoreForm fields={fields} buttonParams={buttonParams} />
      <div className="card-links restore__links">
        {links.map(
          ({ to, content }: FormLink, index: number): React.ReactNode => (
            <Link className="card-link restore__link" key={index} to={to}>
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

export default Restore;
