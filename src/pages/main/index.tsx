import React, { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { FilterForm } from '../../components/filter-form';
import { Searchbar } from '../../components/searchbar';
import { AppContext } from '../../store/context';
import { Spinner } from '../../components/spinner';
import { ActionType } from '../../types';
import PaginatedItems from '../../components/pagination';
import { useNavigate } from 'react-router-dom';
import { getVacancies } from '../../utils/getVacancies';

export const MainPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        {state.isLoading ? (
          <Spinner />
        ) : (
          <section className="main__content-field">
            <Searchbar />
            {/* {contentOnPage()} */}
            <PaginatedItems itemsPerPage={4} />
          </section>
        )}
      </div>
    </main>
  );
};
