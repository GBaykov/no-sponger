import React, { useContext, useEffect, useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import { AppContext } from '../../store/context';
import { Spinner } from '../spinner';
import { ActionType, CardType } from '../../types';
import { Card } from '../card';
import { CardList } from '../card-list';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import { getVacancies } from '../../utils/getVacancies';

export type PaginationProps = {
  itemsPerPage: number;
};

// function Items(cards: [CardType]) {
//   return <>{cards && cards.map((card) => <Card {...card} />)}</>;
// }

export default function PaginatedItems({ itemsPerPage }: PaginationProps) {
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [endOfSet, setEndOfSet] = useState(0);
  const [beginOfSet, setBeginOfSet] = useState(0);

  const { state, dispatch } = useContext(AppContext);
  // const isComponentMounted = useComponentDidMount();

  // useEffect(() => {
  //   if (isComponentMounted) {
  //     getVacans();
  //   }
  // }, [isComponentMounted]);

  // const getVacans = useCallback(async () => {
  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: true },
  //   });

  //   const vacancies = await getVacancies(state);
  //   dispatch({
  //     type: ActionType.SetVacsResp,
  //     payload: { vacsResp: vacancies },
  //   });

  //   dispatch({
  //     type: ActionType.SetIsLoading,
  //     payload: { isLoading: false },
  //   });
  // }, [state.vacsResp]);

  // async function addRepos(userName, currentPage) {
  //   try {
  //     setIsLoading(true);
  //     const repos = await getUserRepos(userName, currentPage);
  //     dispatch({ type: ACTIONS.setRepos, payload: { repos } });
  //     setIsLoading(false);
  //     setIsError(false);
  //   } catch (err) {
  //     setIsLoading(false);
  //     setIsError(true);
  //   }
  // }
  useEffect(() => {
    // addRepos(state.userName, state.currentPage);
    if (state.vacsResp?.total) {
      setPageCount(Math.ceil(state.vacsResp?.total / itemsPerPage));
    }
  }, []);

  useEffect(() => {
    setBeginOfSet(state.currentPage * itemsPerPage - 3);

    if (state.vacsResp?.total) {
      const remnant = (state.currentPage * itemsPerPage) % state.vacsResp?.total;
      const endOfS =
        remnant >= 4
          ? state.currentPage * itemsPerPage
          : state.currentPage * itemsPerPage - remnant;
      setEndOfSet(endOfS);
    }
  }, [state.currentPage]);
  type SelectedItem = {
    selected: number;
  };

  const handlePageClick = (event: SelectedItem) => {
    dispatch({ type: ActionType.SetVacsPage, payload: { vacsPage: event.selected + 1 } });
  };

  const load = isLoading ? <Spinner /> : <CardList />;

  //   function pageCountSet() {
  //     return (
  //       <p className="page-count">
  //         {beginOfSet}-{endOfSet} of {state.reposLenght} items
  //       </p>
  //     );
  //   }

  return (
    <>
      {load}
      <div className="paginate-count">
        {/* {pageCountSet()} */}
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          className="pagination"
          activeClassName="active-page"
          activeLinkClassName="active-link"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item previous-item"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
        />
      </div>
    </>
  );
}
