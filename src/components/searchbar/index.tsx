import React, { useContext, useCallback } from 'react';
import './index.css';
import { Button } from '@mantine/core';
import search from '../../assets/search1.svg';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { fetchVacancies } from '../../services/Api';

export const Searchbar = () => {
  const { state, dispatch } = useContext(AppContext);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SetSearchWord,
      payload: { searhWord: e.currentTarget.value },
    });
  };

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const keyword = state.searhWord;
    const payment_from = +state.from;
    const payment_to = +state.to;
    const catalogues = state.catalogue;
    const no_agreement = 1;
    const count = 4;
    const page = 1;
    const published = 1;

    const vacancies = await fetchVacancies(
      count,
      page,
      no_agreement,
      keyword,
      payment_from,
      payment_to,
      catalogues,
      published,
    );
    console.log(vacancies);
  }

  return (
    <form className="searchbar-form" onSubmit={(e) => onFormSubmit(e)}>
      <div className="searchbar">
        <img src={search} alt="" className="searchbar-icon" />
        <input
          onChange={(e) => onInputChange(e)}
          type="text"
          value={state.searhWord}
          className="searchbar-input"
          placeholder="Введите название вакансии"
        />
        <button type="submit" className="searchbar-btn">
          Поиск
        </button>
      </div>
    </form>
  );
};
