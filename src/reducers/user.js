import { RECEIVE_CURRENT_USER } from '../actions';

export default ( state = '', { type, data } ) => {
   switch(type){
      case RECEIVE_CURRENT_USER:
        return data;
      default: 
        return state;
   }
}