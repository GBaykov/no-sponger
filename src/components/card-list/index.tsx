import React, { useContext, useEffect, useState, useCallback } from 'react';
import './index.css';
import { Card } from '../card';
import { ActionType, CardType } from '../../types';
import { AppContext } from '../../store/context';
import { getVacancies } from '../../utils/getVacancies';
import useComponentDidMount from '../../hooks/useComponentDidMount';

export const CardList = () => {
  const { state, dispatch } = useContext(AppContext);
  // const isComponentMounted = useComponentDidMount();

  // useEffect(() => {
  //   if (isComponentMounted) {
  //     getVacans();
  //   }
  // }, [isComponentMounted]);

  // const getVacans = useCallback(async () => {
  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: true },
  //   });

  //   const vacancies = await getVacancies(state);
  //   dispatch({
  //     type: ActionType.SetVacsResp,
  //     payload: { vacsResp: vacancies },
  //   });

  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: false },
  //   });
  // }, [state.vacsResp]);

  // useEffect(() => {
  //   getVacans();
  // }, []);

  const vacancies = state.vacsResp?.objects;

  return (
    <section className="card-list">
      {vacancies?.map((vacancy) => {
        return (
          <Card
            key={vacancy.id}
            profession={vacancy.profession}
            town={vacancy.town.title}
            type_of_work={vacancy.type_of_work.title}
            payment_to={vacancy.payment_to}
            payment_from={vacancy.payment_from}
            currency={vacancy.currency}
            payment={vacancy.payment}
          />
        );
      })}
    </section>
  );
};
