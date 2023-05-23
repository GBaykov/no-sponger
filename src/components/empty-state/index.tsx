import React from 'react';
import './index.css';
import emptyStateImg from '../../assets/empty-state-2.png';

export const EmptyState = () => {
  return (
    <div className="empty">
      <img src={emptyStateImg} alt="empty state" className="empty-img" />
      <p className="empty-text">Упс, здесь еще ничего нет!</p>
    </div>
  );
};
