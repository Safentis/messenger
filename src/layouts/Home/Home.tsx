import { FC                           } from 'react';
import { useEffect                    } from 'react';
import { useDispatch, useSelector     } from 'react-redux';
import { Props, Validation            } from './Home.interface';
import { reqValidationToken           } from '../../utils/requests';
import { requestAuthenticationFailure } from '../../redux/actionCreators/authentication';
import './Home.css';

const Home: FC <Props> = ({}) => {
    const dispatch : any = useDispatch();
    const { token }: any = useSelector((state: any) => state.authenticationReducer);

    //* If user's token is not valid, 
    //* we redirect user to the authentication page
    useEffect(() => {
        //* We make request by validationToken
        reqValidationToken(token)
            .then((res) => res.json())
            .then(({validation}: Validation) => {
                //* If validation is true, we do nothing
                //* else create action and redirect user to the authentication page
                return validation
                    ? console.log('token valid: ', validation)
                    : dispatch(requestAuthenticationFailure());
            })
            .catch((err) => {
                console.error(`Code: ${err.code}`);
                console.error(`Message: ${err.message}`);
            });
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