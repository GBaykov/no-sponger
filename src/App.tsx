import React, { useMemo, useReducer } from 'react';
import './App.css';
import { AppContext } from './store/context';
import { AppReducer, initialState } from './store/reducer';
import { Router } from './router';

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <AppContext.Provider value={contextValue}>
      <Router />
    </AppContext.Provider>
  );
}

export default App;
