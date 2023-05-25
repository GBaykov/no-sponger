import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Vacancy } from '../../types/vacancies';
import { getFromStorage } from '../../utils/localstorage';
import PaginatedChosen from '../../components/paginationChosen';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { useNavigate } from 'react-router-dom';
import useComponentDidMount from '../../hooks/useComponentDidMount';

export const ChosenPage = () => {
  // const [chosen, setVacancies] = useState<Vacancy[] | null>(null);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const isComponentMounted = useComponentDidMount();

  // useEffect(() => {
  //   if (isComponentMounted) {
  //     const vacs = getFromStorage('chosen');
  //     if (vacs) {
  //       const vacsArr: Vacancy[] = JSON.parse(vacs);
  //       console.log(vacsArr);
  //       setVacancies(vacsArr);
  //     }
  //   }
  // }, [isComponentMounted]);

  useEffect(() => {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      console.log(vacsArr);
      dispatch({
        type: ActionType.SetCurrentPage,
        payload: { currentPage: 1 },
      });
      dispatch({
        type: ActionType.SetChosen,
        payload: { chosen: vacsArr },
      });
    }
  }, []);
  console.log(state.chosen);

  function renderChosen() {
    const vacs = getFromStorage('chosen');
    if (vacs) {
      const vacsArr: Vacancy[] = JSON.parse(vacs);
      return <PaginatedChosen itemsPerPage={4} chosen={vacsArr} />;
    }
    // else {
    //   dispatch({
    //     type: ActionType.SetActiveLink,
    //     payload: { activeLink: '/empty' },
    //   });
    //   navigate('/empty');
    // }
  }

  const redirectToEmpty = () => {
    if (!state.chosen || state.chosen?.length < 0) {
      dispatch({
        type: ActionType.SetActiveLink,
        payload: { activeLink: '/empty' },
      });
      navigate('/empty');
    }
  };

  useEffect(() => {
    redirectToEmpty();
    console.log(state.chosen);
  }, [state.chosen, state.chosen?.length]);

  return (
    <main className="main">
      <div className="main__chosen-field">
        {/* {chosen && chosen?.length > 0 ? (
          <PaginatedChosen itemsPerPage={4} chosen={chosen} />
        ) : (
          <EmptyState isChosen={true} />
        )} */}

        {state.chosen && state.chosen?.length > 0 && (
          <PaginatedChosen itemsPerPage={4} chosen={state.chosen} />
        )}
        {/* {redirectToEmpty} */}
        {/* {renderChosen()} */}
      </div>
    </main>
  );
};
