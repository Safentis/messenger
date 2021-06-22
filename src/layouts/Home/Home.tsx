import { FC, useEffect            } from 'react';
import { Props                    } from './Home.interface';
import { useDispatch, useSelector } from 'react-redux';
import { requestTokenCheck        } from '../../redux/actionCreators/authentication';
import './Home.css';

const Home: FC <Props> = ({}): any => {
    //* Redux hooks
    const dispatch: any = useDispatch();
    const token: string = useSelector((state: any) => state.authenticationReducer.token);

    //* If user's token is not valid, 
    //* we redirect user to the authentication page
    useEffect(() => {
        dispatch(
            requestTokenCheck(
                token
            )
        );
    }, []);

    return (
        <section className="home">
            <div className="home__inner">
                <h2 className="home__title">
                    Wellcome to the WEHELP
                </h2>
                <p className="home__description">
                    That so good and simple messenger!
                </p>
            </div>
        </section>
    );
};

export default Home;