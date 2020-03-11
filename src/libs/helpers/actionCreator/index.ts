// Interfaces
import { TActionCreator } from './interfaces';

export const actionCreator: TActionCreator = (actionType, actionPayload) => ({
  type: actionType,
  payload: actionPayload,
});