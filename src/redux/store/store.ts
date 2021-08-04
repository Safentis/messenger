import { createStore, applyMiddleware, Store } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "../reducers/rootReducer";
import rootSaga from "../sagas/sagas";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
