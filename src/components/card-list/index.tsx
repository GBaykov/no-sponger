import React, { useContext, useEffect, useState, useCallback } from 'react';
import './index.css';
import { Card } from '../card';
import { ActionType, CardType } from '../../types';
import { AppContext } from '../../store/context';
import { getVacancies } from '../../utils/getVacancies';
import useComponentDidMount from '../../hooks/useComponentDidMount';
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
