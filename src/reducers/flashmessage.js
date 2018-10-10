import { LOGIN_RECEIVE, SIGNUP_RECEIVE } from '../actions';

export default ( state = '', { type, data } ) => {
   switch(type){
      case LOGIN_RECEIVE:
        return data;
      case SIGNUP_RECEIVE:
        return data;
      default: 
        return state;
   }
}