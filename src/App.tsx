import React, { useEffect, useMemo, useReducer, useState } from 'react';
import './App.css';
import { AppContext } from './store/context';
import { AppReducer, initialState } from './store/reducer';
import { Router } from './router';
import { Refresh_token, log_in } from './services/Api';
import { async } from 'q';
import { ActionType } from './types';
import useComponentDidMount from './hooks/useComponentDidMount';
import { setToStorage } from './utils/localstorage';

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isComponentMounted = useComponentDidMount();

  const setAccessData = async () => {
    try {
      setIsLoading(true);
      const now = new Date();
      if (!state.logInData?.access_token || state.logInData === null) {
        const logInResp = await log_in();
        dispatch({
          type: ActionType.SetlogInData,
          payload: { logInData: logInResp },
        });
        setToStorage('logInResp', JSON.stringify(logInResp));
        setIsLoading(false);
        setIsError(false);
      }
      if (state.logInData?.ttl && new Date(state.logInData?.ttl) > new Date()) {
        const freshData = await Refresh_token();
        dispatch({
          type: ActionType.SetlogInData,
          payload: { logInData: freshData },
        });
        setIsLoading(false);
        setIsError(false);
      }
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router />
    </AppContext.Provider>
  );
}

export default App;
