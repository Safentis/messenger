import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Popup from '../../../layouts/Popup';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Avatar from '../../../components/Avatar/Avatar';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

import './Profile.css';
import { requestUpdate } from '../../../redux/actionCreators/user';
import { RootReducerState } from '../../../redux/reducers/rootReducer.interface';
import { UserStore } from '../../../redux/reducers/userReducer/userReducer.interface';
import { avatarType, fileType, Props, ProfileInterface, submitType } from './Profile.interface';
import { STANDART_AVATAR } from '../../../utils/consts';
import { password, required } from './Profile.support';

const Profile: FC<Props> = ({}): React.ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootReducerState): UserStore => {
    return state.userReducer.user;
  });

  //* ------------------------------------------------
  //* Image extensions that are allowed to put
  const extensions: string[] = ['image/png', 'image/jpeg'];

  //* ------------------------------------------------
  //* Handler of the file load
  const [avatar, setAvatar]: avatarType = useState(user.photo || STANDART_AVATAR);
  const [file, setFile]: fileType = useState({});
  const handleFile = (event: Event) => {
    let target: any = event.target;
    let file: any = target.files[0];

    for (let extension of extensions) {
      if (file && file.type === extension) {
        const avatar: string = window.URL.createObjectURL(file);
        setAvatar(avatar);
        setFile(file);
      }
    }
  };

  //* ------------------------------------------------
  //* Handler of the submit
  const handleSubmit = async (event: submitType) => {
    let { password, passwordRepeat, name } = event;
    let isExtension: boolean = 'type' in file;
    let isCompare: boolean = password === passwordRepeat;
    let uid: string = user.uid;

    if (isExtension && isCompare) {
      let user: ProfileInterface = { uid, file, name, password };
      setIsLoading(true);
      dispatch(requestUpdate({ user, closeModal, setIsLoading }));
    }
  };

  //* ------------------------------------------------
  //* Start value for form
  const initialValues = {
    name: user.name,
  };

  const popupTitle: string = 'Update profile';
  const popupExpose = {
    icon: faUserAlt,
    title: 'Profile',
  };

  //* ------------------------------------------------
  //* Modal handlers
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Popup
      popupTitle={popupTitle}
      popupExpose={popupExpose}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form className="profile" action="none" onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <>
                  <Label className="label-main  profile__label">
                    Name
                    <Input className="input-main profile__input" placeholder="Name" {...input} />
                  </Label>
                  {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                </>
              )}
            </Field>
            <div className="profile__user">
              <Avatar className="profile__avatar" height="100" width="100" src={avatar} />
              <FileField className="profile__image" onChange={handleFile} />
            </div>
            <Field name="password" validate={password}>
              {({ input, meta }) => (
                <>
                  <Label className="label-main profile__label">
                    Password
                    <Input
                      className="input-main profile__input"
                      placeholder="Password"
                      type="password"
                      {...input}
                    />
                  </Label>
                  {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                </>
              )}
            </Field>
            <Field name="passwordRepeat" validate={password}>
              {({ input, meta }) => (
                <>
                  <Label className="label-main profile__label">
                    Repeat password
                    <Input
                      className="input-main profile__input"
                      placeholder="Repeat Password"
                      type="password"
                      {...input}
                    />
                  </Label>
                  {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                </>
              )}
            </Field>
            <Button className="button-main profile__update" type="submit">
              {!isLoading ? 'Update' : <Spinner color="secondary" />}
            </Button>
          </form>
        )}
      </Form>
    </Popup>
  );
};

const FileField = ({ name, ...props }: any) => (
  <Field name={name}>
    {({ input: { value, onChange, ...input } }) => (
      <input {...input} type="file" onChange={({ target }) => onChange(target.files)} {...props} />
    )}
  </Field>
);

export default Profile;
