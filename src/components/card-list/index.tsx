import react from 'react';
import './index.css';
import { Card } from '../card';
import { CardType } from '../../types';

const cardData: CardType = {
  profession: 'Ведущий графический дизайнер НЕ УДАЛЕННО',
  town: 'Москва',
  type_of_work: 'Полный рабочий день',
  payment_from: 80000,
};

export const CardList = () => {
  return (
    <section className="card-list">
      {/* {cards&& cards.map((card)=>{
        <Card {...card} />
      })}
       */}
      <Card {...cardData} />
      <Card {...cardData} />
      <Card {...cardData} />
    </section>
  );
};
