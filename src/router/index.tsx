import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { Layout } from '../pages/layout';
import { MainPage } from '../pages/main';
import { ChosenPage } from '../pages/chosen';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/chosen" element={<ChosenPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
