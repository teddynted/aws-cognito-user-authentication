import { combineReducers } from 'redux';
import sessionReducer from './session';
import flashMessageReducer from './flashmessage';
import userInfoReducer from './user';

export default combineReducers({
   session: sessionReducer,
   flashmessage: flashMessageReducer,
   userinfo: userInfoReducer
});