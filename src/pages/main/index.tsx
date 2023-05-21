import React from 'react';
import './index.css';
import { FilterForm } from '../../components/filter-form';
import { Searchbar } from '../../components/searchbar';

export const MainPage = () => {
  return (
    <main className="main">
      {/* <FilterForm /> */}
      <div>
        <Searchbar />
      </div>
    </main>
  );
};
