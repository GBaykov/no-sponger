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
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [beginOfSet, setBeginOfSet] = useState(1);
  const [endOfSet, setEndOfSet] = useState(state.vacsPage);

  useEffect(() => {
    // addRepos(state.userName, state.currentPage);
    if (state.vacsResp?.total) {
      const divisible = state.vacsResp?.total;
      if (divisible > 500) {
        setPageCount(Math.ceil(500 / itemsPerPage));
      } else {
        setPageCount(Math.ceil(divisible / itemsPerPage));
      }
    }
  }, [state.vacsResp?.total]);

  type SelectedItem = {
    selected: number;
  };

  const handlePageClick = (event: SelectedItem) => {
    if (state.vacsResp?.total && event.selected < state.vacsResp?.total) {
      dispatch({ type: ActionType.SetVacsPage, payload: { vacsPage: +event.selected } });
    }
  };
  // const { state, dispatch } = useContext(AppContext);

  const load = () => {
    const vacancies = state.vacsResp?.objects;
    let content: JSX.Element | null = null;
    if (vacancies) {
      content = isLoading ? <Spinner /> : <CardList vacancies={vacancies} />;
    }
    return content;
  };
  return (
    <>
      {load()}
      <div className="paginate-count">
        {/* {pageCountSet()} */}
        <ReactPaginate
          breakLabel={null}
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={0}
          initialPage={state.vacsPage}
          // forcePage={state.vacsPage}
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
