import { FC    } from 'react';
import { Props } from './Content.interface';
import './Content.css';

const Content: FC <Props> = ({children}) => {
    return (
        <section className="content">
            {children}
        </section>
    );
};

export default Content;