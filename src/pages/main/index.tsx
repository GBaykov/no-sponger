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

export const MainPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const isComponentMounted = useComponentDidMount();

  useEffect(() => {
    if (isComponentMounted) {
      getVacans();
    }
  }, [isComponentMounted]);

  const getVacans = useCallback(async () => {
    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: true },
    });

    const vacancies = await getVacancies(state);
    dispatch({
      type: ActionType.SetVacsResp,
      payload: { vacsResp: vacancies },
    });

    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: false },
    });
  }, [state.vacsResp]);

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
            {/* <PaginatedItems itemsPerPage={4} /> */}
          </section>
        )}
      </div>
    </main>
  );
};
