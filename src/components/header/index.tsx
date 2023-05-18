import React, { useState, useContext, useCallback } from 'react';
import './index.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { AppReducer } from '../../store/reducer';
import { AppContext } from '../../store/context';
import { ActionType, StateActions } from '../../types';

export const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  console.log(state.activeLink);

  const onLinkClick = useCallback(
    (link: string) => {
      console.log(link);
      dispatch({
        type: ActionType.SetActiveLink,
        payload: { activeLink: link },
      });
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
            <li className="list-item" onClick={() => onLinkClick('main')}>
              <Link to="/main" className={state.activeLink === 'main' ? 'activeLink' : ''}>
                Поиск Вакансий
              </Link>
            </li>
            <li className="list-item" onClick={() => onLinkClick('chosen')}>
              <Link to="/chosen" className={state.activeLink === 'chosen' ? 'activeLink' : ''}>
                Избранное
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
