import React, { useContext, useCallback, useState, useEffect } from 'react';
import './index.css';
import { Button } from '@mantine/core';
import search from '../../assets/search1.svg';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { fetchVacancies } from '../../services/Api';
import { getVacancies } from '../../utils/getVacancies';
import { useNavigate } from 'react-router-dom';

export const Searchbar = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SetSearchWord,
      payload: { searhWord: e.currentTarget.value },
    });
  };

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: ActionType.SetVacsPage,
      payload: { vacsPage: 0 },
    });
    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: true },
    });

    const vacancies = await getVacancies(state);
    if (vacancies.total === 0) {
      dispatch({
        type: ActionType.SetActiveLink,
        payload: { activeLink: '/empty' },
      });
      navigate('/empty');
    }

    dispatch({
      type: ActionType.SetVacsResp,
      payload: { vacsResp: vacancies },
    });

    dispatch({
      type: ActionType.SetIsLoading,
      payload: { isLoading: false },
    });
  }
  // useEffect(() => {
  //   console.log('sadfsa');
  //   if (!state.isLoading && state.vacsResp && state.vacsResp.total === 0) {
  //     dispatch({
  //       type: ActionType.SetActiveLink,
  //       payload: { activeLink: '/empty' },
  //     });
  //     navigate('/empty');
  //     dispatch({
  //       type: ActionType.SetSearchWord,
  //       payload: { searhWord: '' },
  //     });
  //   }
  // }, [state]);

  return (
    <form className="searchbar-form" onSubmit={(e) => onFormSubmit(e)}>
      <div className="searchbar">
        <img src={search} alt="" className="searchbar-icon" />
        <input
          data-elem="search-input"
          onChange={(e) => onInputChange(e)}
          type="text"
          value={state.searhWord}
          className="searchbar-input"
          placeholder="Введите название вакансии"
        />
        <button type="submit" className="searchbar-btn" data-elem="search-button">
          Поиск
        </button>
      </div>
    </form>
  );
};
