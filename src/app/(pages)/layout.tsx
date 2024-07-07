'use client';

import { Header } from '@/components/header';
import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import React, { FC, ReactNode, useEffect, useContext } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

type LayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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

export default MainLayout;
