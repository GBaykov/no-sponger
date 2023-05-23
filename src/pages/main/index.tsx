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

  const contentOnPage =
    !state.isLoading && state.vacsResp && state.vacsResp.total === 0 ? (
      <EmptyState />
    ) : (
      <CardList />
    );

  // const MainContent = () => {

  //  if (!state.isLoading && state.vacsResp && state.vacsResp.total === 0) {
  //     return <EmptyState />;
  //   } else {
  //     return (

  //         <CardList />
  //         {/* <PaginatedItems itemsPerPage={4} /> */}
  //       </section>
  //     );
  //   }
  // };

  return (
    <main className="main">
      <div className="main__content">
        <FilterForm />
        {/* {MainContent()} */}
        {state.isLoading ? (
          <Spinner />
        ) : (
          <section className="main__content-field">
            <Searchbar />
            {/* <CardList /> */}
            {contentOnPage}

            {/* <PaginatedItems itemsPerPage={4} /> */}
          </section>
        )}
      </div>
    </main>
  );
};
