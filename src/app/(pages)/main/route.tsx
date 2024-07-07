import { FilterForm } from '@/components/filter-form';
import PaginatedItems from '@/components/pagination';
import { Searchbar } from '@/components/searchbar';
import { Spinner } from '@/components/spinner';
import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import { getVacancies } from '@/utils/getVacancies';
import { useCallback, useContext, useEffect } from 'react';

const Page = () => {
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

export default Page;
