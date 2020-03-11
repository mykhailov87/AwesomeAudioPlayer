// Core
import { all, call, takeEvery } from 'redux-saga/effects';

// Types
import { asyncTypes } from './asyncTypes';

// Workers
import { callGetTracksDataWorker } from './workers';

function* watchGetTracksDataAsync() {
  yield takeEvery(asyncTypes.GET_TRACKS_DATA_ASYNC, callGetTracksDataWorker);
}

export function* tracksWatchers() {
  yield all([
    call(watchGetTracksDataAsync),
  ]);
}
