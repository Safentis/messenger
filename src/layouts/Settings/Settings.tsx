import { FC, useState    } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCog  } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, FieldArray } from 'formik';
import Modal               from 'react-modal';
import Button              from '../../components/Button/Button';
import './Settings.css';
import { useDispatch } from 'react-redux';
import { requestSettings } from '../../redux/actionCreators/menudialogs';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      minWidth: '40%',
      minHeight: '40%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

const Settings: FC = (): any => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false);

    
    const dispatch = useDispatch();
    const handleSubmit = ({autocomplite}: any) => {
        dispatch(requestSettings(autocomplite));
    }



    return (
        <section className="modal">
            <Button onClick={openModal}>
                <FontAwesomeIcon 
                    className="icon_white" 
                    icon={faCog}
                    size={'lg'}
                />
            </Button>
            <Modal
                onRequestClose={closeModal}
                style={customStyles}
                isOpen={isOpen}
            >
                <h2 className="modal__title">
                    Настройки диалогов
                </h2>
                <Button 
                    className="modal__button" 
                    onClick={closeModal}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>
                <Formik
                    initialValues={{autocomplite: 'Добро пожаловать в диалог!'}}
                    onSubmit={handleSubmit}
                    render={formikProps => (
                        <>
                            <Form className="settings">
                                <Field 
                                    className="settings__autocompite input-auth" 
                                    placeholder="Autocomplite"
                                    name="autocomplite" 
                                    type="text" 
                                />
                                <Button className="button-auth settings__submit" type="submit">
                                    save phrase
                                </Button>
                            </Form>
                        </>
                    )}
                />
            </Modal>
        </section>
    );
};

export default Settings;