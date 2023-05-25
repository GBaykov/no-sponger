import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Vacancy } from '../../types/vacancies';
import { getFromStorage } from '../../utils/localstorage';
import PaginatedChosen from '../../components/paginationChosen';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { useNavigate } from 'react-router-dom';

export const ChosenPage = () => {
  const [chosen, setVacancies] = useState<Vacancy[] | null>(null);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      console.log(vacs);
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      setVacancies(vacsArr);
    }
  }, []);

  // const renderChosen = () => {
  //   if (chosen && chosen?.length > 0) {
  //     return <PaginatedChosen itemsPerPage={4} chosen={chosen} />;
  //   } else {
  //     dispatch({
  //       type: ActionType.SetActiveLink,
  //       payload: { activeLink: '/empty' },
  //     });
  //     navigate('/empty');
  //   }
  // };

  const redirectToEmpty = () => {
    if (!chosen || chosen?.length < 0) {
      dispatch({
        type: ActionType.SetActiveLink,
        payload: { activeLink: '/empty' },
      });
      navigate('/empty');
    }
  };

  useEffect(() => {
    redirectToEmpty();
  }, [chosen, chosen?.length]);

  return (
    <main className="main">
      <div className="main__chosen-field">
        {/* {chosen && chosen?.length > 0 ? (
          <PaginatedChosen itemsPerPage={4} chosen={chosen} />
        ) : (
          <EmptyState isChosen={true} />
        )} */}
        <PaginatedChosen itemsPerPage={4} chosen={chosen} />
        {/* {renderChosen()} */}
      </div>
    </main>
  );
};
