'use client';

import '@/styles/chosen.css';

import PaginatedChosen from '@/components/paginationChosen';
import useComponentDidMount from '@/hooks/useComponentDidMount';
import { AppContext } from '@/store/context';
import { ActionType } from '@/types';
import { Vacancy } from '@/types/vacancies';
import { getFromStorage } from '@/utils/localstorage';
import { useContext, useEffect } from 'react';

const Page = () => {
  const { state, dispatch } = useContext(AppContext);
  //   const navigate = useNavigate();
  // const isComponentMounted = useComponentDidMount();

  // useEffect(() => {
  //   const vacs = getFromStorage('chosen');
  //   if (vacs) {
  //     const vacsArr: Vacancy[] = JSON.parse(vacs);
  //     dispatch({
  //       type: ActionType.SetCurrentPage,
  //       payload: { currentPage: 1 },
  //     });
  //     dispatch({
  //       type: ActionType.SetChosen,
  //       payload: { chosen: vacsArr },
  //     });
  //   }
  // }, []);

  // const redirectToEmpty = () => {
  //   if (!state.chosen || state.chosen?.length === 0) {
  //     dispatch({
  //       type: ActionType.SetActiveLink,
  //       payload: { activeLink: '/empty' },
  //     });
  //     //   navigate('/empty');
  //   }
  // };

  // useEffect(() => {
  //   if (isComponentMounted) {
  //     redirectToEmpty();
  //   }
  // }, [isComponentMounted, state.chosen, state.chosen?.length]);

  return (
    <main className="main">
      <div className="main__chosen-field">
        CHOSEN
        {/* {state.chosen && state.chosen?.length > 0 && (
          <PaginatedChosen itemsPerPage={4} chosen={state.chosen} />
        )} */}
      </div>
    </main>
  );
};

export default Page;
