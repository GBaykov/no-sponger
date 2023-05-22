export type AppState = {
  from: string;
  to: string;
  searhWord: string;
  branch: string;
  activeLink: string;
  currentPage: number;
  logInData: LogInResponse | null;
};
export enum ActionType {
  SetTo,
  SetFrom,
  SetSearchWord,
  SetField,
  SetActiveLink,
  SetCurrentPage,
  SetlogInData,
}

export interface SetTo {
  type: ActionType.SetTo;
  payload: { to: string };
}

export interface SetFrom {
  type: ActionType.SetFrom;
  payload: { from: string };
}

export interface SetSearchWord {
  type: ActionType.SetSearchWord;
  payload: { searhWord: string };
}

export interface SetField {
  type: ActionType.SetField;
  payload: { branch: string };
}

export interface SetActiveLink {
  type: ActionType.SetActiveLink;
  payload: { activeLink: string };
}

export interface SetCurrentPage {
  type: ActionType.SetCurrentPage;
  payload: { currentPage: number };
}

export interface SetlogInData {
  type: ActionType.SetlogInData;
  payload: { logInData: LogInResponse };
}

export type StateActions =
  | SetTo
  | SetFrom
  | SetSearchWord
  | SetField
  | SetActiveLink
  | SetCurrentPage
  | SetlogInData;

export type CardType = {
  profession: string;
  town: string;
  type_of_work: string;
  payment_from: number;
};

export type LogInResponse = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
};

export type ErrorResponse = {
  error: { code: number; message: string; error: string };
};
