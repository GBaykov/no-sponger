import React, { useEffect, useMemo, useReducer, useState } from 'react';
import './App.css';
import { AppContext } from './store/context';
import { AppReducer, initialState } from './store/reducer';
import { Router } from './router';
import { Refresh_token, log_in } from './services/Api';
import { async } from 'q';
import { ActionType, LogInResponse } from './types';
import useComponentDidMount from './hooks/useComponentDidMount';
import { getFromStorage, setToStorage } from './utils/localstorage';
import { Spinner } from './components/spinner';

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const isComponentMounted = useComponentDidMount();

  const logInStoraged = getFromStorage('logInResp');

  const setAccessData = async () => {
    try {
      setIsLoading(true);
      if (logInStoraged) {
        const storageData = JSON.parse(logInStoraged) as LogInResponse;
        if (!storageData.access_token) {
          const logInResp = await log_in();
          dispatch({
            type: ActionType.SetlogInData,
            payload: { logInData: logInResp },
          });
          setToStorage('logInResp', JSON.stringify(logInResp));
          setIsLoading(false);
          setIsError(false);
        }
        if (storageData.ttl < Date.now() / 1000) {
          const freshData = await Refresh_token();
          dispatch({
            type: ActionType.SetlogInData,
            payload: { logInData: freshData },
          });
          setIsLoading(false);
          setIsError(false);
        }
      } else {
        const logInResp = await log_in();
        dispatch({
          type: ActionType.SetlogInData,
          payload: { logInData: logInResp },
        });
        setToStorage('logInResp', JSON.stringify(logInResp));
        setIsLoading(false);
        setIsError(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setErrorText(err as string);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isComponentMounted) {
      setAccessData();
    }
  }, [isComponentMounted]);

  return (
    <AppContext.Provider value={contextValue}>
      {isLoading ? <Spinner /> : <Router />}
    </AppContext.Provider>
  );
}

export default App;
