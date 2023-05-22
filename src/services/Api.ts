import React from 'react';
import { API_URL, login, password, client_id, client_secret, hr, secretKey } from '../constants';
import axios from 'axios';
import { number } from 'yargs';
import { LogInResponse } from '../types';
import { getFromStorage } from '../utils/localstorage';

// const log_in = async () => {
//   const response = await axios.get(
//     `${API_URL}/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}&hr=${hr}`,
//   );
//   return response.data;
// };
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
  const response = await axios.get<LogInResponse>(`${API_URL}/2.0/oauth2/password/`, data);
  return response.data;
};
const access_resp = getFromStorage('logInResp');
const refresh_token: string = access_resp !== null ? JSON.parse(access_resp).refresh_token : '';

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
  const response = await axios.get<LogInResponse>(
    `${API_URL}/2.0/oauth2/refresh_token/`,
    refreshRequest_data,
  );
  return response.data;
};
