import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../store/context';
import { ActionType } from '../../types';
import { CardList } from '../card-list';
import { Vacancy } from '../../types/vacancies';

export type PaginationProps = {
  itemsPerPage: number;
  chosen: Vacancy[] | null;
};

export default function PaginatedChosen({ itemsPerPage, chosen }: PaginationProps) {
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState<Vacancy[] | null>(null);
  const [beginOfSet, setBeginOfSet] = useState(1);
  const [endOfSet, setEndOfSet] = useState(state.currentPage);

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
    if (chosen) {
      return <CardList vacancies={currentItems} />;
    }
    return null;
  };

  return (
    <>
      {load()}
      <div className="paginate-count">
        <ReactPaginate
          breakLabel={null}
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={0}
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
