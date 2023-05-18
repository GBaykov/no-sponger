import React from 'react';
import { ActionType, AppState, StateActions } from '../types';

export const initialState: AppState = {
  from: '',
  to: '',
  searhWord: '',
  field: '',
  activeLink: 'main',
};

export function AppReducer(state: AppState, action: StateActions): AppState {
  switch (action.type) {
    case ActionType.SetFrom:
      return { ...state, from: action.payload.from };
    case ActionType.SetTo:
      return { ...state, to: action.payload.to };
    case ActionType.SetField:
      return { ...state, field: action.payload.field };
    case ActionType.SetSearchWord:
      return { ...state, searhWord: action.payload.searhWord };
    case ActionType.SetActiveLink:
      return { ...state, activeLink: action.payload.activeLink };
    default:
      return state;
  }
}
