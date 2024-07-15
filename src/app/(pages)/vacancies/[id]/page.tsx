'use client';

import '@/styles/vacancy.css';

import { Card } from '@/components/card';
import { AppContext } from '@/store/context';
import { TypographyStylesProvider } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

const Page = () => {
  const { state, dispatch } = useContext(AppContext);
  const [description, setDescription] = useState(state.currentVacancy?.vacancyRichText);

  // useEffect(() => {
  //   if (state.currentVacancy?.vacancyRichText) {
  //     setDescription(state.currentVacancy?.vacancyRichText);
  //   }
  // }, []);

  return (
    <main className="main vacancy-page">
      <div className="vacancy-page__content">
        VACANCIES ID
        {/* {state.currentVacancy !== null && <Card vacancy={state.currentVacancy} isBlack={true} />}
        <section className="vacancy-page__text">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
          </TypographyStylesProvider>
        </section> */}
      </div>
    </main>
  );
};

export default Page;
