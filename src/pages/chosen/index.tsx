import React, { useState, useEffect } from 'react';
import './index.css';
import { Vacancy } from '../../types/vacancies';
import { getFromStorage } from '../../utils/localstorage';
import PaginatedChosen from '../../components/paginationChosen';
import { EmptyState } from '../../components/empty-state';

export const ChosenPage = () => {
  const [chosen, setVacancies] = useState<Vacancy[] | null>(null);
  useEffect(() => {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      console.log(vacs);
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      setVacancies(vacsArr);
    }
  }, []);
  console.log(chosen);
  return (
    <main className="main">
      {chosen ? <PaginatedChosen itemsPerPage={4} chosen={chosen} /> : <EmptyState />}
    </main>
  );
};
