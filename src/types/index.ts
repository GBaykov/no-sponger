export type AppState = {
  from: string;
  to: string;
  searhWord: string;
  branch: string;
  activeLink: string;
  currentPage: number;
};
export enum ActionType {
  SetTo,
  SetFrom,
  SetSearchWord,
  SetField,
  SetActiveLink,
  SetCurrentPage,
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
export type StateActions =
  | SetTo
  | SetFrom
  | SetSearchWord
  | SetField
  | SetActiveLink
  | SetCurrentPage;

export type CardType = {
  profession: string;
  town: string;
  type_of_work: string;
  payment_from: number;
};
