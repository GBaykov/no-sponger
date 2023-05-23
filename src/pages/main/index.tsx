import React, { useContext } from 'react';
import './index.css';
import { FilterForm } from '../../components/filter-form';
import { Searchbar } from '../../components/searchbar';
import { CardList } from '../../components/card-list';
import { AppContext } from '../../store/context';
import { Spinner } from '../../components/spinner';

export const MainPage = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        {state.isLoading ? (
          <Spinner />
        ) : (
          <section className="main__content-field">
            <Searchbar />
            <CardList />
          </section>
        )}
      </div>
    </main>
  );
};
