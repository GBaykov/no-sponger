import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import './index.css';
import { AppContext } from '../../store/context';
import { Spinner } from '../spinner';
import { ActionType } from '../../types';

import { CardList } from '../card-list';

export type PaginationProps = {
  itemsPerPage: number;
};

export default function PaginatedItems({ itemsPerPage }: PaginationProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { state, dispatch } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);

  const vacsPage = Math.abs(Number(params.get('page'))) || 1;
  const [initialPage, setInitialPage] = useState(vacsPage);

  useEffect(() => {
    const page = Number(vacsPage);
    setInitialPage(page);
    params.set('page', String(page));
    replace(`${pathname}?${params}`);
  }, [vacsPage]);

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
      dispatch({ type: ActionType.SetVacsPage, payload: { vacsPage: +event.selected + 1 } });
      const page = event.selected + 1;
      params.set('page', String(page));

      replace(`${pathname}?${params.toString()}`);
    }
  };

  // const load = () => {
  //   const vacancies = state.vacsResp?.objects;
  //   if (vacancies) {
  //     return <CardList vacancies={vacancies} />;
  //   }
  //   return null;
  // };
  console.log(vacsPage);

  const pageRange = vacsPage > 1 && vacsPage < pageCount ? 2 : 3;
  // const initialPage = vacsPage > 0 ?

  return (
    <>
      {/* {load()} */}
      <div className="paginate-count">
        <ReactPaginate
          breakLabel={null}
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRange}
          marginPagesDisplayed={0}
          initialPage={initialPage - 1}
          // forcePage={vacsPage}
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
