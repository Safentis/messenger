import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware             from 'redux-saga';
import storage                          from 'redux-persist/lib/storage'


import { rootReducer }                  from '../reducers/rootReducer';
import rootSaga                         from '../sagas/sagas';

const persistConfig: any = {
    key: 'root',
    storage,
};

const persistedReducer: any = persistReducer(persistConfig, rootReducer);
const sagaMiddleware  : any = createSagaMiddleware();
const store           : any = createStore(
    persistedReducer, 
    applyMiddleware(sagaMiddleware),
);
const persistor       : any = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };