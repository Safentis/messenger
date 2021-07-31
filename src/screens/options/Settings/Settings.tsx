import { FC, useState } from "react";
import { Props } from "./Settings.interface";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import { requestSettings } from "../../../redux/actionCreators/user";
import Popup from "../../../layouts/Popup/Popup";
import Button from "../../../components/Button/Button";
import Label from "../../../components/Label/Label";
import Input from "../../../components/Input/Input";
import "./Settings.css";

const Settings: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const settings = useSelector((state: any) => {
    return state.userReducer.settings;
  });

  //* ------------------------------------------------
  //* Handler of the form, that set data to the store
  const handleSubmit = (settings: any) => {
    dispatch(requestSettings({ settings, closeModal }));
  };

  //* ------------------------------------------------
  //* Start value for form
  const initialValues = {
    greeting: settings.greeting,
    greetings: settings.greetings,
  };

  const popupTitle: string = "Dialog Settings";
  const popupExpose: any = {
    icon: faCog,
    title: "Settings",
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
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form className="settings">
            <div className="greetings settings__greetings">
              <FieldArray name="greetings">
                {(filedArrayProps: any) => {
                  const { push, remove, form } = filedArrayProps;
                  const { values } = form;
                  const { greetings } = values;

                  return (
                    <>
                      {greetings.map((greeting: string, index: number) => (
                        <div className="greeting greetings__item" key={index}>
                          <Input
                            className="input-main greeting__input"
                            placeholder="Greeting"
                            {...form.getFieldProps(`greetings[${index}]`)}
                          />

                          <Button
                            className="button-main greeting__button"
                            onClick={() => remove(index)}
                            type="button"
                          >
                            -
                          </Button>
                          <Button
                            className="button-main greeting__button"
                            onClick={() =>
                              form.setFieldValue("greeting", greeting)
                            }
                            type="button"
                          >
                            Choose
                          </Button>
                        </div>
                      ))}
                      <Button
                        className="button-main greetings__button"
                        onClick={() => push("")}
                        type="button"
                      >
                        Add more
                      </Button>
                    </>
                  );
                }}
              </FieldArray>
              <div className="phrase greetings__phrase">
                <Label className="label-main phrase__label">
                  Aitomatic greeting
                  <Input
                    className="input-main phrase__input"
                    placeholder="Greeting"
                    {...formikProps.getFieldProps("greeting")}
                  />
                </Label>
                <Button className="button-main phrase__button" type="submit">
                  Apply settings
                </Button>
              </div>
            </div>
            <div className="headers">headers</div>
            <div className="subheaders">subheaders</div>
          </Form>
        )}
      />
    </Popup>
  );
};

export default Settings;
