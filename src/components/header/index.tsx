import React, { useContext, useCallback } from 'react';
import './index.css';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

import { AppContext } from '../../store/context';
import { ActionType } from '../../types';

export const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const onLinkClick = useCallback(
    (link: string) => {
      dispatch({
        type: ActionType.SetActiveLink,
        payload: { activeLink: link },
      });
      navigate(`${link}`);
    },
    [state.activeLink],
  );
  return (
    <header className="header">
      <div className="header__content content">
        <p className="content-logo">
          <img src={logo}></img>
        </p>
        <nav className="content-nav nav">
          <ul className="nav-list list">
            <li className="list-item" onClick={() => onLinkClick('/main')}>
              <Link to="/main" className={state.activeLink === '/main' ? 'activeLink' : ''}>
                Поиск Вакансий
              </Link>
            </li>
            <li className="list-item" onClick={() => onLinkClick('/chosen')}>
              <Link to="/chosen" className={state.activeLink === '/chosen' ? 'activeLink' : ''}>
                Избранное
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
