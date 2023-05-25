import React, { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { FilterForm } from '../../components/filter-form';
import { Searchbar } from '../../components/searchbar';
import { AppContext } from '../../store/context';
import { Spinner } from '../../components/spinner';
import { ActionType } from '../../types';
import PaginatedItems from '../../components/pagination';
import { getVacancies } from '../../utils/getVacancies';

export const MainPage = () => {
  const { state, dispatch } = useContext(AppContext);

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

  useEffect(() => {
    getVacans();
  }, [state.activeLink]);

  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        {state.isLoading ? (
          <Spinner />
        ) : (
          <section className="main__content-field">
            <Searchbar />
            <PaginatedItems itemsPerPage={4} />
          </section>
        )}
      </div>
    </main>
  );
};
