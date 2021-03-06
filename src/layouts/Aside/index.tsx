import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

import { Props, LinkInterface } from './index.interface';
import './index.css';
import {
  MENU_CONTENT_ACTIVES,
  MENU_CONTENT_COMPLITED,
  MENU_CONTENT_NOACTIVES,
  MENU_CONTENT_SAVED,
} from '../../utils/consts';
import Search from '../../components/Search/Search';

const Aside: FC<Props> = ({ children }): React.ReactElement => {
  //* ------------------------------------
  //* URL's for links
  const { url } = useRouteMatch();
  const ACTIVES: string = url + MENU_CONTENT_ACTIVES;
  const COMPLITED: string = url + MENU_CONTENT_COMPLITED;
  const SAVED: string = url + MENU_CONTENT_SAVED;
  const NOACTIVES: string = url + MENU_CONTENT_NOACTIVES;

  //* ------------------------------------
  //* Location for link
  const location: any = useLocation();

  const links: LinkInterface[] = [
    { path: ACTIVES, content: '', icon: faHistory },
    { path: NOACTIVES, content: '', icon: faUserFriends },
    { path: SAVED, content: '', icon: faClipboardList },
    { path: COMPLITED, content: '', icon: faArchive },
  ];

  //* ------------------------------------
  //* Content
  const LINKS = links.map(({ path, content, icon }: LinkInterface, index: number) => (
    <li className="controls__button" key={index}>
      <Link to={path}>
        <FontAwesomeIcon
          className={`icon ${
            new RegExp(path).test(location.pathname) ? 'icon_brown' : 'icon_white'
          } controls__icon`}
          icon={icon}
        />
        {content}
      </Link>
    </li>
  ));

  return (
    <section className="aside">
      <div className="aside__inner">
        <div className="aside__header">
          <h2 className="aside__title">Wehelp</h2>
        </div>
        <div className="aside__body">
          <ul className="controls aside__controls">{LINKS}</ul>
        </div>
        <div className="aside__search">
          <Search />
        </div>
        <div className="aside__content">
          <div className="aside__content-inner">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Aside;
