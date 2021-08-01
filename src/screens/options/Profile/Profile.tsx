import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import Popup from "../../../layouts/Popup/Popup";
import Label from "../../../components/Label/Label";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Avatar from "../../../components/Avatar/Avatar";
import { requestUpdate } from "../../../redux/actionCreators/user";

import { STANDART_AVATAR } from "../../../utils/consts";
import { RootReducerState } from "../../../redux/reducers/rootReducer.interface";
import { avatarType, fileType, Props } from "./Profile.interface";
import "./Profile.css";

const Profile: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerState) => {
    return state.userReducer.user;
  });

  //* ------------------------------------------------
  //* Image extensions that are allowed to put
  const extensions: string[] = ["image/png", "image/jpeg"];

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
  const handleSubmit = async (event: any) => {
    let { password, passwordRepeat, name } = event;
    let isExtension: boolean = "type" in file;
    let isCompare: boolean = password === passwordRepeat;
    let uid: string = user.uid;

    if (isExtension && isCompare) {
      let user = { uid, file, name, password };

      dispatch(requestUpdate({ user, closeModal }));
    }
  };

  //* ------------------------------------------------
  //* Start value for form
  const initialValues = {
    name: user.name,
  };

  const popupTitle: string = "Update profile";
  const popupExpose = {
    icon: faUserAlt,
    title: "Profile",
  };

  //* ------------------------------------------------
  //* Modal handlers
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
            <Field name="name">
              {({ input }) => (
                <Label className="label-main  profile__label">
                  Name
                  <Input
                    className="input-main profile__input"
                    placeholder="Name"
                    {...input}
                  />
                </Label>
              )}
            </Field>
            <div className="profile__user">
              <Avatar
                className="profile__avatar"
                height="100"
                width="100"
                src={avatar}
              />
              <FileField className="profile__image" onChange={handleFile} />
            </div>
            <Field name="password">
              {({ input }) => (
                <Label className="label-main profile__label">
                  Password
                  <Input
                    className="input-main profile__input"
                    placeholder="Password"
                    {...input}
                  />
                </Label>
              )}
            </Field>
            <Field name="passwordRepeat">
              {({ input }) => (
                <Label className="label-main profile__label">
                  Repeat password
                  <Input
                    className="input-main profile__input"
                    placeholder="Repeat Password"
                    {...input}
                  />
                </Label>
              )}
            </Field>
            <Button className="button-main profile__update" type="submit">
              Update
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
      <input
        {...input}
        type="file"
        onChange={({ target }) => onChange(target.files)}
        {...props}
      />
    )}
  </Field>
);

export default Profile;
