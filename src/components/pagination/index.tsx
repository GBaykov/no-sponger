import React, { useContext, useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
import './index.css';
import { AppContext } from '../../store/context';
import { Spinner } from '../spinner';
import { ActionType } from '../../types';

import { CardList } from '../card-list';

export type PaginationProps = {
  itemsPerPage: number;
};

export default function PaginatedItems({ itemsPerPage }: PaginationProps) {
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
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

  const load = () => {
    const vacancies = state.vacsResp?.objects;
    if (vacancies) {
      return <CardList vacancies={vacancies} />;
    }

    return null;
  };
  return (
    <>
      {load()}
      <div className="paginate-count">
        {/* <ReactPaginate
          breakLabel={null}
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={0}
          initialPage={state.vacsPage}
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
        /> */}
      </div>
    </>
  );
}
