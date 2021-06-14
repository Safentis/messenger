import { FC    } from 'react';
import { Props } from './Home.interface';
import './Home.css';

const Home: FC <Props> = ({}) => {
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