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
import { Vacancy } from '../../types/vacancies';
import { getFromStorage, removeFromStorage } from '../../utils/localstorage';

export type PaginationProps = {
  itemsPerPage: number;
  chosen: Vacancy[] | null;
};

export default function PaginatedChosen({ itemsPerPage, chosen }: PaginationProps) {
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState<Vacancy[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [beginOfSet, setBeginOfSet] = useState(1);
  const [midOfSet, setMidOfSet] = useState(1);
  const [endOfSet, setEndOfSet] = useState(state.vacsPage);

  useEffect(() => {
    if (chosen && chosen?.length > 0) {
      setPageCount(Math.ceil(chosen?.length / itemsPerPage));
    }
  }, [chosen]);

  useEffect(() => {
    setBeginOfSet(state.currentPage * itemsPerPage - 3);
    let remnant = 0;
    if (chosen) {
      remnant = (state.currentPage * itemsPerPage) % chosen?.length;
    }
    const endOfS =
      remnant >= 4 ? state.currentPage * itemsPerPage : state.currentPage * itemsPerPage - remnant;
    setEndOfSet(endOfS);
  }, [state.currentPage, chosen?.length]);

  useEffect(() => {
    if (chosen) {
      const currentItems = chosen.slice(beginOfSet - 1, endOfSet);
      setCurrentItems(currentItems);
    }
  }, [beginOfSet, endOfSet, chosen?.length]);

  type SelectedItem = {
    selected: number;
  };

  const handlePageClick = (event: SelectedItem) => {
    dispatch({ type: ActionType.SetCurrentPage, payload: { currentPage: event.selected + 1 } });
  };

  const load = () => {
    let content: JSX.Element | null = null;
    if (chosen) {
      content = isLoading ? <Spinner /> : <CardList vacancies={currentItems} />;
    }
    return content;
  };
  console.log(beginOfSet, endOfSet);
  // removeFromStorage('chosen');
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
