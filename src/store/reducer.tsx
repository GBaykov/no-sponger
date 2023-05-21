import React from 'react';
import { ActionType, AppState, StateActions } from '../types';

export const initialState: AppState = {
  from: '',
  to: '',
  searhWord: '',
  branch: '',
  activeLink: '/',
  currentPage: 1,
};

export function AppReducer(state: AppState, action: StateActions): AppState {
  switch (action.type) {
    case ActionType.SetFrom:
      return { ...state, from: action.payload.from };
    case ActionType.SetTo:
      return { ...state, to: action.payload.to };
    case ActionType.SetField:
      return { ...state, branch: action.payload.branch };
    case ActionType.SetSearchWord:
      return { ...state, searhWord: action.payload.searhWord };
    case ActionType.SetActiveLink:
      return { ...state, activeLink: action.payload.activeLink };
    case ActionType.SetCurrentPage:
      return { ...state, currentPage: action.payload.currentPage };
    default:
      return state;
  }
}
