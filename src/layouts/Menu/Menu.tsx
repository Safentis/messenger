import { FC    } from 'react';
import { Props } from './Menu.interface';
import './Menu.css';

//* LAYAOUTS
import MenuHeader from './MenuHeader/MenuHeader';
import MenuSearch from './MenuSearch/MenuSearch';
import MenuTabs   from './MenuTabs/MenuTabs';

//* ROUTES
import MenuRoutes from './MenuRoutes';

const Menu: FC <Props> = ({}) => {
    return (
        <section className="menu">
            <div className="menu__inner">
                <MenuHeader className="menu__header"/>
                <MenuSearch className="menu__search"/>
                <MenuTabs   className="menu__tabs"/>
            </div>
            <div className="menu__content">
                <MenuRoutes />
            </div>
        </section>
    );
};

export default Menu;