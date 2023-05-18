import React, { FC, ReactNode } from 'react';
import { Header } from '../components/header';
import { Outlet } from 'react-router-dom';
type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* {children} */}
    </>
  );
};
