import { FC                } from 'react';
import { Props             } from './Namebar.interface';
import { useDispatch       } from 'react-redux';
import { useSelector       } from 'react-redux';
import { requestExitingApp } from '../../redux/actionCreators/authentication';
import Button                from '../../components/Button/Button';
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
                        <Button className="namebar__button button-action" onClick={handleExit}>
                            exit
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