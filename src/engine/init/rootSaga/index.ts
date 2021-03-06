// Core
import { all, call } from 'redux-saga/effects';

// Watchers
import { tracksWatchers } from '../../core/tracks/saga/watchers';

export function* rootSaga() {
  yield all([
    call(tracksWatchers),
  ]);
}
