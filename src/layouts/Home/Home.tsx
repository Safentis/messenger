import { FC                       } from 'react';
import { useEffect                } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Props                    } from './Home.interface';
import { requestTokenCheck        } from '../../redux/actionCreators/authentication';
import './Home.css';

const Home: FC <Props> = ({}) => {
    const dispatch : any = useDispatch();
    const { token }: any = useSelector((state: any) => state.authenticationReducer);

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
                    Wellcome USER NAME
                </h2>
                <p className="home__description">
                    That so good and simple messenger!
                </p>
            </div>
        </section>
    );
};

export default Home;