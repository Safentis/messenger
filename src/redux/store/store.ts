import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware             from 'redux-saga';

import { rootReducer } from '../reducers/rootReducer';
import rootSaga        from '../sagas/sagas';

export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware),
);

//* With next function we run of rootSaga
sagaMiddleware.run(rootSaga);