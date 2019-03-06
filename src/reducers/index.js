import { combineReducers } from 'redux';
import GifsReducer from './gifs';
import ModalReducer from './modal';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer} from 'redux-form';
import AuthReducer from './auth';


// combining all of our reducers into the rootReducer
// passing the main reducing function as a parameter
// when creating the store.

// using redux's built-in combineReducers function
// to create a single object that contains a bunch of reducers.
// the key on the object is 'gifs', is the name of the
// piece of the state, and the vaule is the reducer itself
// or more accurately what is being returned by the reducer

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  gifs: GifsReducer,
  modal: ModalReducer,
  router: routerReducer
});

export default rootReducer;
