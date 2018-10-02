import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import Sagas from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// Run the saga
sagaMiddleware.run(Sagas);

export default store;