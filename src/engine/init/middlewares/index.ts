// Engine
import logger from './logger';
import sagaMiddleWare from './saga';

const middleware: Array<any> = [sagaMiddleWare];

if (__DEV__) {
  middleware.push(logger);
}

export { sagaMiddleWare, middleware };
