import React from 'react';
import { API_URL, login, password, client_id, client_secret, hr, secretKey } from '../constants';
import axios from 'axios';
import { CataloguesResponse, LogInResponse } from '../types';
import { getFromStorage } from '../utils/localstorage';
import { Vacancies } from '../types/vacancies';
import { APP_API_BASE_URL, APP_API_ROUTES } from '@/constants/app';

const data = {
  params: {
    login,
    password,
    client_id,
    client_secret,
    hr,
  },
  headers: {
    'x-secret-key': secretKey,
    'X-Api-App-Id': client_secret,
  },
};

export const log_in = async () => {
  try {
    const response = await axios.get<LogInResponse>(`${APP_API_BASE_URL}${APP_API_ROUTES.LOGIN}`);
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};
const access_resp = getFromStorage('logInResp');
const refresh_token: string = access_resp !== null ? JSON.parse(access_resp).refresh_token : '';
const access_token: string = access_resp !== null ? JSON.parse(access_resp).access_token : '';

const refreshRequest_data = {
  params: {
    refresh_token,
    client_id,
    client_secret,
  },
  headers: {
    'x-secret-key': secretKey,
    'X-Api-App-Id': client_secret,
  },
};

export const Refresh_token = async () => {
  try {
    const response = await axios.get<LogInResponse>(`${APP_API_BASE_URL}${APP_API_ROUTES.REFRESH}`);

    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};

export const fetchCatalogues = async () => {
  try {
    const response = await axios.get<CataloguesResponse>(
      `${APP_API_BASE_URL}${APP_API_ROUTES.CATALOGUES}`,
    );
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};

export const fetchVacancies = async (
  count: number,
  page: number,
  no_agreement: number,
  keyword?: string,
  payment_from?: number,
  payment_to?: number,
  catalogues?: number,
  published?: number,
) => {
  const vacanciesRequestData = {
    params: {
      keyword,
      payment_from,
      payment_to,
      catalogues,
      no_agreement,
      count,
      page,
      published,
    },
    headers: {
      'x-secret-key': secretKey,
      'X-Api-App-Id': client_secret,
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get<Vacancies>(`${APP_API_BASE_URL}${APP_API_ROUTES.VACANCIES}`);
    return response.data;
  } catch (err) {
    throw new Error(`${err} `);
  }
};
