// Core
import { createSelector } from 'reselect';

// Interfaces
import { IAppState } from '../../init/store/interfaces';

const tracksReducerSelector = (state: IAppState) => state.tracks;

export const tracksSelector = createSelector(
  tracksReducerSelector,
  tracksReducer => tracksReducer.data,
);

export const isTracksLoadingSelector = createSelector(
  tracksReducerSelector,
  tracksReducer => tracksReducer.pending,
);
