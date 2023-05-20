export type AppState = {
  from: string;
  to: string;
  searhWord: string;
  branch: string;
  activeLink: string;
};
export enum ActionType {
  SetTo,
  SetFrom,
  SetSearchWord,
  SetField,
  SetActiveLink,
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
export type StateActions = SetTo | SetFrom | SetSearchWord | SetField | SetActiveLink;
