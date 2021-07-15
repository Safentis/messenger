import { FC                } from 'react';
import { Props             } from './Namebar.interface';
import { useDispatch       } from 'react-redux';
import { useSelector       } from 'react-redux';
import { requestExitingApp } from '../../redux/actionCreators/authentication';
import { FontAwesomeIcon   } from '@fortawesome/react-fontawesome';
import { faSignOutAlt      } from '@fortawesome/free-solid-svg-icons';
import Button                from '../../components/Button/Button';
import Profile               from '../../screens/options/Profile/Profile';
import './Namebar.css';


const Namebar: FC <Props> = ({children}) => {
    
    //* ---------------------------------------------------
    //* Application exit handler
    const dispatch = useDispatch();
    const handleExit = () => {
        dispatch(requestExitingApp());
    }



    //* ---------------------------------------------------
    //* Application user information
    const user = useSelector((state: any) => {
        return state.userReducer.user;
    });


    return (
        <section className="namebar">
            <div className="namebar__inner">
                <div className="namebar__top">
                    <div className="namebar__name">
                        {user.email}
                    </div>
                    <div className="namebar__controls">
                        <Profile />
                        <Button className="namebar__button" onClick={handleExit}>
                            exit
                            <FontAwesomeIcon 
                                className="icon icon_white namebar__icon" 
                                icon={faSignOutAlt}
                            />
                        </Button>
                    </div>
                </div>
                <div className="namebar__bottom">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Namebar;