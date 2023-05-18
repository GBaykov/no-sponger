import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { Layout } from '../pages/layout';
import { MainPage } from '../pages/main';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/main" element={<MainPage />} />
      </Route>
    </Routes>
  );
};
