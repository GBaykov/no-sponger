import React from 'react';
import { ActionType, AppState, StateActions } from '../styles';

export const initialState: AppState = {
  from: '',
  to: '',
  searhWord: '',
  field: '',
};

export function AppReducer(state: AppState, action: StateActions): AppState {
  switch (action.type) {
    case ActionType.SetFrom:
      return { ...state, from: action.payload.from };
    case ActionType.SetTo:
      return { ...state, from: action.payload.to };
    case ActionType.SetField:
      return { ...state, from: action.payload.field };
    case ActionType.SetSearchWord:
      return { ...state, from: action.payload.searhWord };
    default:
      return state;
  }
}
