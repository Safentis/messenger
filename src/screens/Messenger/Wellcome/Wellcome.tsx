import { FC          } from 'react';
import { Props       } from './Wellcome.interface';
import { useSelector } from 'react-redux';
import './Wellcome.css';

const Wellcome: FC <Props> = ({}) => {
    return (
        <section className="wellcome">
            <h2 className="wellcome__title">
                Wllcome User
            </h2>
            <p className="wellcome__description">
                That so good and simple messenger!
            </p>
        </section>
    );
};

export default Wellcome;