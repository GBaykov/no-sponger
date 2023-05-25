import React from 'react';
import './index.css';
import { Card } from '../card';
import { Vacancy } from '../../types/vacancies';

export type CardListProps = {
  vacancies: Vacancy[] | null;
};
export const CardList = ({ vacancies }: CardListProps) => {
  return (
    <section className="card-list">
      {vacancies?.map((vacancy) => {
        return <Card key={vacancy.id} vacancy={vacancy} />;
      })}
    </section>
  );
};
