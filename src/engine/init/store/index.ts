// Core
import {
  createStore,
  applyMiddleware,
  compose,
  Store,
} from 'redux';

// Engine
import { sagaMiddleWare, middleware } from '../middlewares';
import { rootReducer } from '../rootReducer';
import { rootSaga } from '../rootSaga';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = __DEV__ && devtools ? devtools : compose;

// prettier-ignore
const store: Store = createStore(
  rootReducer(),
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);

// Run all
sagaMiddleWare.run(rootSaga);

export { store };
