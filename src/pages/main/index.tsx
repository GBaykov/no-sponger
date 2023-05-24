import React, { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { FilterForm } from '../../components/filter-form';
import { Searchbar } from '../../components/searchbar';
import { CardList } from '../../components/card-list';
import { AppContext } from '../../store/context';
import { Spinner } from '../../components/spinner';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { getVacancies } from '../../utils/getVacancies';
import { ActionType } from '../../types';
import PaginatedItems from '../../components/pagination';
import { EmptyState } from '../../components/empty-state';

export const MainPage = () => {
  const { state, dispatch } = useContext(AppContext);

  const contentOnPage =
    !state.isLoading && state.vacsResp && state.vacsResp.total === 0 ? (
      <EmptyState isChosen={false} />
    ) : (
      <PaginatedItems itemsPerPage={4} />
    );

  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        {state.isLoading ? (
          <Spinner />
        ) : (
          <section className="main__content-field">
            <Searchbar />
            {contentOnPage}
          </section>
        )}
      </div>
    </main>
  );
};
