import React, { useState, useContext, useEffect } from 'react';
import { TypographyStylesProvider } from '@mantine/core';
import './index.css';
import { AppContext } from '../../store/context';
import { Card } from '../../components/card';

export const VacancyPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [description, setDescription] = useState(state.currentVacancy?.vacancyRichText);

  useEffect(() => {
    if (state.currentVacancy?.vacancyRichText) {
      setDescription(state.currentVacancy?.vacancyRichText);
    }
  }, []);

  return (
    <main className="main vacancy-page">
      <div className="vacancy-page__content">
        {state.currentVacancy !== null && <Card vacancy={state.currentVacancy} isBlack={true} />}
        <section className="vacancy-page__text">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
          </TypographyStylesProvider>
        </section>
      </div>
    </main>
  );
};
