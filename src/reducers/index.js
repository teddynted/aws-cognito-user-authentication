import { combineReducers } from 'redux';
import sessionReducer from './session';
import flashReducer from './flash';
import userReducer from './user';

export default combineReducers({
   session: sessionReducer,
   flash: flashReducer,
   user: userReducer
});