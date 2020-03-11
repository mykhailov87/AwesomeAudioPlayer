// Helpers
import { actionCreator } from '../../../../libs/helpers/actionCreator';

// Types
import { asyncTypes } from './asyncTypes';

export const asyncActions = Object.freeze({
  getTracksAsync() {
    return actionCreator(asyncTypes.GET_TRACKS_DATA_ASYNC);
  },
});
