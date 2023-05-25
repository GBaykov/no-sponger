import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { Layout } from '../pages/layout';
import { MainPage } from '../pages/main';
import { ChosenPage } from '../pages/chosen';
import { VacancyPage } from '../pages/vacancy';
import { EmptyState } from '../pages/empty-state';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/chosen" element={<ChosenPage />} />
          <Route path="/vacancy" element={<VacancyPage />} />
          <Route path="/empty" element={<EmptyState />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
