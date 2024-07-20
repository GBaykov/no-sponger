import React, { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { Card } from '../card';
import { Vacancy } from '../../types/vacancies';
import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import { getVacancies } from '@/utils/getVacancies';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type CardListProps = {
  vacancies: Vacancy[] | null;
};
export const CardList = () => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { state, dispatch } = useContext(AppContext);

  const getVacans = useCallback(async () => {
    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: true },
    });
    const values = {
      keyword: params.get('keyword') || '',
      payment_from: params.get('payment_from') || '',
      payment_to: params.get('payment_to') || '',
      catalogues: params.get('catalogues') || '',
      page: params.get('page') || '',
    };

    const vacancies = await getVacancies(values);
    console.log(vacancies);
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
  }, []);
  // const vacancies = state.vacsResp?.objects;

  return (
    <section className="card-list">
      {state.vacsResp?.objects?.map((vacancy) => {
        return <Card key={vacancy.id} vacancy={vacancy} />;
      })}
    </section>
  );
};
