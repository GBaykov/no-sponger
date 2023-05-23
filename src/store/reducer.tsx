import React from 'react';
import { ActionType, AppState, StateActions } from '../types';

export const initialState: AppState = {
  from: '',
  to: '',
  searhWord: '',
  catalogue: 0,
  activeLink: '/',
  currentPage: 1,
  logInData: null,
};

export function AppReducer(state: AppState, action: StateActions): AppState {
  switch (action.type) {
    case ActionType.SetFrom:
      return { ...state, from: action.payload.from };
    case ActionType.SetTo:
      return { ...state, to: action.payload.to };
    case ActionType.SetCatalogue:
      return { ...state, catalogue: action.payload.catalogue };
    case ActionType.SetSearchWord:
      return { ...state, searhWord: action.payload.searhWord };
    case ActionType.SetActiveLink:
      return { ...state, activeLink: action.payload.activeLink };
    case ActionType.SetCurrentPage:
      return { ...state, currentPage: action.payload.currentPage };
    case ActionType.SetlogInData:
      return { ...state, logInData: action.payload.logInData };
    default:
      return state;
  }
}
