// Core
import { combineReducers } from 'redux';

// Reducers
import { tracksReducer } from '../../core/tracks/reducer';

// Interfaces
import { IAppState } from '../store/interfaces';

const rootReducer = () => combineReducers<IAppState>({
  tracks: tracksReducer,
});

export { rootReducer };
