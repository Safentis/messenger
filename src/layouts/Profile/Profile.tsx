import { FC, useState    } from 'react';
import { Props           } from './Profile.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt       } from '@fortawesome/free-solid-svg-icons';
import { faTimes         } from '@fortawesome/free-solid-svg-icons';
import { useDispatch     } from 'react-redux';
import { useSelector     } from 'react-redux';
import { Form, Field     } from 'react-final-form'
import firebase            from 'firebase';
import Modal               from 'react-modal';
import Input               from '../../components/Input/Input';
import Avatar              from '../../components/Avatar/Avatar';
import Button              from '../../components/Button/Button';
import standartAvatar      from '../../HOC/standart-avatar';
import { requestAvatar   } from '../../redux/actionCreators/menudialogs';
import './Profile.css';
import { useEffect } from 'react';


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
  )

const Profile: FC <Props> = (): any => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false);


    const dispatch = useDispatch();
    const uid = useSelector((state: any) => {
        return state.menudialogsReducer.uid;
    });


    const [file, setFile] = useState({});
    const [src, setSrc] = useState('');
    const handleFile = (event: any): void => {
        
        if (event.target.files[0]) {
            const file: any    = event.target.files[0];
            const src : string = window.URL.createObjectURL(file);
            
            setFile(file);
            setSrc(src);
        }
    }


    const [initialValues, setInitialValues] = useState({});
    
    useEffect(() => {
        const databaseRef = firebase.database()
        const usersRef = databaseRef.ref('users/operators/' + uid);

        usersRef.on('value', (profile: any) => {
            const values = profile.val();

            values['password'] = '';
            values['passwordRepeat'] = '';

            setInitialValues(values);
        });
    }, [])

    const handleSubmit = (form: any) => {
        const {name, password = '', passwordRepeat = ''} = form;
        const storageRef: any    = firebase.storage();
        const avatarsRef: any    = storageRef.ref('avatars/' + uid);
        const databaseRef = firebase.database()
        const usersRef = databaseRef.ref('users/operators/' + uid);
        const pass      : string = password.toLowerCase();
        const passRep   : string = passwordRepeat.toLowerCase();

        if (pass === passRep) {

            new Promise((resolve, reject) => {
                usersRef.update({...form});
                resolve(true)
            }).then(() => {
                avatarsRef.put(file as Blob);
                dispatch(requestAvatar(uid));
            }).then(() => {
                closeModal();    
            }).catch((error: any) => {
                console.error(error);
            });
        } else {
            console.error('Passwords is no corrected');
        }
    }

    return (
        <section className="modal">
            <Button onClick={openModal}>
                <FontAwesomeIcon 
                    className="icon_white" 
                    icon={faUserAlt}
                    size={'lg'}
                />
            </Button>
            <Modal
                onRequestClose={closeModal}
                style={customStyles}
                isOpen={isOpen}
            >
                <h2 className="modal__title">
                    Обновить профиль
                </h2>
                <Button 
                    className="modal__button" 
                    onClick={closeModal}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>
                <Form onSubmit={handleSubmit} initialValues={initialValues}>
                    {({handleSubmit}) => (
                        <form className="profile modal__profile" action="none" onSubmit={handleSubmit}>
                            <Field name="name">
                                {({input}) => (
                                    <Input 
                                        className="input-auth profile__input-name" 
                                        placeholder="Name" 
                                        {...input}
                                    />
                                )}
                            </Field>
                            <div className="profile__avatar">
                                <Avatar 
                                    className="profile__avatar-example" 
                                    height="100"
                                    width="100" 
                                    src={src} 
                                />
                                <FileField 
                                    className="profile__input profile__avatar-file" 
                                    onChange={handleFile}
                                />
                            </div>
                            <Field name="password">
                                {({input}) => (
                                    <Input 
                                        className="input-auth profile__input-password" 
                                        placeholder="Password" 
                                        {...input}
                                    />
                                )}
                            </Field>
                            <Field name="passwordRepeat">
                                {({input}) => (
                                    <Input 
                                        className="input-auth profile__input-password" 
                                        placeholder="Repeat Password" 
                                        {...input}
                                    />
                                )}
                            </Field>
                            <Button className="button-auth profile__button" type="submit">
                                Update profile
                            </Button>
                        </form>
                    )}
                </Form>
            </Modal>
        </section>
    );
};

export default Profile;