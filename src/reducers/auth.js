import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../actions';


// setting the initialState for the user to be signed out,
// but if the SIGN_IN_USER is fired, a new copy of the state
// is created with authenticated set to true(the reducer should
// act as a "Save-As" functionality instead of mutating the state)
// if SIGN_OUT_USER is fired, a new copy is created and authenticated
// is set to false. 

const initialState = {
  authenticated: false,
  error: null
};

// Adding error as a key in the state.
// AUTH_ERROR action, setting the message that comes back 
// from Firebase as the error; in AUTH_USER and SIGN_OUT_User,
// but setting the error as null. 
// This is to see even if the user signs in/out successfully,
// an error message will show about incorrect password or duplicate email.

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    case SIGN_OUT_USER:
    return {
      ...state,
      authenticated: false,
      error: null
    };
    default:
      return state;
  }
}

// BEFORE:
// export default function gifs (state = initialState, action) {
//   switch (action.type) {
//     case SIGN_IN_USER:
//     return {
//       ...state, authenticated: true
//     };
//     case SIGN_OUT_USER:
//     return {
//       ...state, authenticated: false
//     };
//     default: 
//     return state;
//   }
// }