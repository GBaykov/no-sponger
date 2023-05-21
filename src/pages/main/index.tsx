import React from 'react';
import './index.css';
import { FilterForm } from '../../components/filter-form';
import { Searchbar } from '../../components/searchbar';
import { CardList } from '../../components/card-list';

export const MainPage = () => {
  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        <section className="main__content-field">
          <Searchbar />
          <CardList />
        </section>
      </div>
    </main>
  );
};
