import react from 'react';
import './index.css';
import { Card } from '../card';

const cardData = {
  profession: 'Ведущий графический дизайнер НЕ УДАЛЕННО',
  town: 'Москва',
  type_of_work: 'Полный рабочий день',
  payment_from: 80000,
};

export const CardList = () => {
  return (
    <section className="card-list">
      <Card {...cardData} />
      <Card {...cardData} />
      <Card {...cardData} />
      <Card {...cardData} />
    </section>
  );
};
