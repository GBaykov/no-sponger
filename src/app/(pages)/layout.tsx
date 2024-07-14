'use client';

import { Header } from '@/components/header';
import { AppContext } from '@/store/context';
import { AppReducer, initialState } from '@/store/reducer';
import { ActionType } from '@/types';
import React, { FC, ReactNode, useEffect, useContext, useMemo, useReducer } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const { state, dispatch } = useContext(AppContext);
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch({
  //     type: ActionType.SetActiveLink,
  //     payload: { activeLink: '/main' },
  //   });
  //   if (state.activeLink === '/') {
  //     navigate('/main');
  //   }
  // }, []);

  return (
    <AppContext.Provider value={contextValue}>
      <Header />
      {/* <Outlet /> */}
      {children}
    </AppContext.Provider>
  );
};

export default MainLayout;
