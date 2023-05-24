import React, { useState, useEffect } from 'react';
import './index.css';
import { Vacancy } from '../../types/vacancies';
import { getFromStorage } from '../../utils/localstorage';

export const ChosenPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null);

  // (`vacancy:${id}`, JSON.stringify(vacancy))

  useEffect(() => {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      setVacancies(vacsArr);
    }
  }, []);

  return <main className="main"></main>;
};
