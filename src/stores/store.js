import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from "../reducer/appReducer";
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const reduxLogger = createLogger({ diff: true });
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const store = createStore(
    persistReducer(persistConfig,
        combineReducers( {
          app: appReducer,
        })
    ),
    applyMiddleware(
        reduxLogger,
        ...middlewares
    )
);

export const persistor = persistStore(store);

export default store;