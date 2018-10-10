import { RECEIVE_SESSION } from '../actions';

export default ( state = false, { type, data } ) => {
   switch(type){
      case RECEIVE_SESSION:
        return data;
      default: 
        return state;
   }
}