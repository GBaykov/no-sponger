import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import { Card } from '../card';
import { ActionType, CardType } from '../../types';
import { AppContext } from '../../store/context';
import { getVacancies } from '../../utils/getVacancies';
import { Vacancies } from '../../types/vacancies';
import useComponentDidMount from '../../hooks/useComponentDidMount';

const cardData: CardType = {
  profession: 'Ведущий графический дизайнер НЕ УДАЛЕННО',
  town: 'Москва',
  type_of_work: 'Полный рабочий день',
  payment_from: 80000,
};

export const CardList = () => {
  const { state, dispatch } = useContext(AppContext);
  const isComponentMounted = useComponentDidMount();

  // useEffect(() => {
  //   getVacans();
  // }, []);
  useEffect(() => {
    if (isComponentMounted) {
      getVacans();
    }
  }, [isComponentMounted]);

  async function getVacans() {
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

    return vacancies;
  }
  const vacancies = state.vacsResp?.objects;
  console.log(vacancies);

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
          />
        );
      })}

      {/* <Card {...cardData} />
      <Card {...cardData} />
      <Card {...cardData} /> */}
    </section>
  );
};
