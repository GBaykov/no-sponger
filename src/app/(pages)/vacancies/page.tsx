'use client';
import '@/styles/vacancies.css';
import { FilterForm } from '@/components/filter-form';
import PaginatedItems from '@/components/pagination';
import { Searchbar } from '@/components/searchbar';
import { AppContext } from '@/store/context';
import { Suspense, useContext } from 'react';
import { CardList } from '@/components/card-list';

const VacanciesPage = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <main className="main">
      <div className="main__content">
        <Suspense>
          {' '}
          <FilterForm />
        </Suspense>

        <section className="main__content-field">
          <Suspense>
            {' '}
            <Searchbar />
          </Suspense>
          <Suspense>
            <CardList />
          </Suspense>
          {state.vacsResp?.objects.length ? <PaginatedItems /> : <div />}
        </section>
      </div>
    </main>
  );
};

export default VacanciesPage;
