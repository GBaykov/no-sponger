import React, { FC, ReactNode, useState, useEffect, useContext } from 'react';
import { Header } from '../components/header';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../store/context';
import { ActionType } from '../types';
type LayoutProps = {
  children?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: ActionType.SetActiveLink,
      payload: { activeLink: '/main' },
    });
    if (state.activeLink === '/') {
      navigate('/main');
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      {children}
    </>
  );
};
