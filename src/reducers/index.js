import { combineReducers } from 'redux';
import sessionReducer from './session';
import flashMessageReducer from './flashmessage';

export default combineReducers({
   session: sessionReducer,
   flashmessage: flashMessageReducer
});