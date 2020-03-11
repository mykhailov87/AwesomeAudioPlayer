export type TActionCreator = <T>(actionType: string, actionPayload?: T) => IAction<T>;

export interface IAction<T> {
  type: string;
  payload?: T;
}
