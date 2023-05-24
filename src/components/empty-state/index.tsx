import React, { useContext } from 'react';
import './index.css';
import emptyStateImg from '../../assets/empty-state-2.png';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';

type EmptyStateProps = {
  isChosen: boolean;
};

export const EmptyState = ({ isChosen }: EmptyStateProps) => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const onButtoneClick = () => {
    dispatch({
      type: ActionType.SetActiveLink,
      payload: { activeLink: '/main' },
    });
    navigate('/main');
  };

  return (
    <div className="empty">
      <img src={emptyStateImg} alt="empty state" className="empty-img" />
      <p className="empty-text">Упс, здесь еще ничего нет!</p>
      {isChosen && (
        <button onClick={onButtoneClick} className="empty-btn">
          Поиск Вакансий
        </button>
      )}
    </div>
  );
};
