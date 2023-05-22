import React from 'react';
import { API_URL, login, password, client_id, client_secret, hr, secretKey } from '../constants';
import axios from 'axios';
import { number } from 'yargs';
import { CataloguesResponse, ErrorResponse, LogInResponse } from '../types';
import { getFromStorage } from '../utils/localstorage';

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
    const response = await axios.get<LogInResponse>(`${API_URL}/2.0/oauth2/password/`, data);
    return response.data;
  } catch (err) {
    const { error } = err as ErrorResponse;

    throw new Error(`${error.message} with code ${error.code}`);
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
    const response = await axios.get<LogInResponse>(
      `${API_URL}/2.0/oauth2/refresh_token/`,
      refreshRequest_data,
    );
    return response.data;
  } catch (err) {
    const { error } = err as ErrorResponse;

    throw new Error(`${error.message} with code ${error.code}`);
  }
};

// export const fetchVacancies = async () => {
//     try {
//       const response = await axios.get<LogInResponse>(
//         `${API_URL}/2.0/vacancies/`,
//         refreshRequest_data,
//       );
//       return response.data;
//     } catch (err) {
//       const { error } = err as ErrorResponse;

//       throw new Error(`${error.message} with code ${error.code}`);
//     }
//   };

export const fetchCatalogues = async () => {
  try {
    const response = await axios.get<CataloguesResponse>(`${API_URL}/2.0/catalogues/`, {
      headers: {
        'x-secret-key': secretKey,
        'X-Api-App-Id': client_secret,
        access_token: access_token,
      },
    });
    return response.data;
  } catch (err) {
    const { error } = err as ErrorResponse;

    throw new Error(`${error.message} with code ${error.code}`);
  }
};
