'use client';

import React, { useContext, useCallback, useEffect } from 'react';
import { useUrl } from 'nextjs-current-url';
import './index.css';
import logo from '../../assets/logo.svg';

// import { AppContext } from '../../store/context';

import { AppContext } from '@/store/context';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/app';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const { href: currentUrl, pathname } = useUrl() ?? {};
  const router = useRouter();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__content content">
        <p className="content-logo">
          <img src={logo.src}></img>
        </p>
        <nav className="content-nav nav">
          <ul className="nav-list list">
            <li className="list-item">
              <Link
                onClick={() => router.push(APP_ROUTES.VACANCIES)}
                href={`${APP_ROUTES.VACANCIES}`}
                className={APP_ROUTES.VACANCIES === pathname ? 'activeLink' : ''}
              >
                Поиск Вакансий
              </Link>
            </li>
            <li className="list-item">
              <Link
                onClick={() => router.push(APP_ROUTES.CHOSEN)}
                href={`${APP_ROUTES.CHOSEN}`}
                className={APP_ROUTES.CHOSEN === pathname ? 'activeLink' : ''}
              >
                Избранное
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
