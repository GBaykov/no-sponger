import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import search from '../../assets/search1.svg';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { getVacancies } from '../../utils/getVacancies';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Searchbar = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { state, dispatch } = useContext(AppContext);
  const [keyword, setKeyWord] = useState('');

  useEffect(() => {
    const word = params.get('keyword');
    setKeyWord(word || '');
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
  };

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (keyword) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
    dispatch({
      type: ActionType.SetVacsPage,
      payload: { vacsPage: 0 },
    });
  }

  return (
    <form className="searchbar-form" onSubmit={(e) => onFormSubmit(e)}>
      <div className="searchbar">
        <img src={search.src} alt="" className="searchbar-icon" />
        <input
          data-elem="search-input"
          onChange={(e) => onInputChange(e)}
          type="text"
          value={keyword}
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
