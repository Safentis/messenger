import { FC, useState    } from 'react';
import { Props           } from './Popup.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes         } from '@fortawesome/free-solid-svg-icons';
import Modal               from 'react-modal';
import Button              from '../../components/Button/Button';
import './Popup.css';

Modal.setAppElement('#root');

const Popup: FC <Props> = ({children, popupTitle, popupExpose}) => {

    //* ------------------------------------------------
    //* Modal handlers
    const [isOpen, setIsOpen] = useState(false);
    const openModal  = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    //* ------------------------------------------------
    //* Content
    const MODAL_TITLE = (
        <h2 className="popup__title">
            {popupTitle}
        </h2>
    );

    return (
        <section className="popup">
            <Button className="popup__expose namebar__button" onClick={openModal}>
                {popupExpose.title}
                <FontAwesomeIcon 
                    className="icon icon_white popup__expose-icon namebar__icon" 
                    icon={popupExpose.icon}
                    size={'lg'}
                />
            </Button>
            <Modal 
                onRequestClose={closeModal} 
                style={customStyles} 
                isOpen={isOpen}
            >
                {MODAL_TITLE}          
                <Button className="modal__button-close" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>
                {children}
            </Modal>
        </section>
    );
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '2.5rem',
      minWidth: '40%',
      minHeight: '40%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

export default Popup;