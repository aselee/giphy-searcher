import request from 'superagent';

import Firebase from 'firebase';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// Action Type:
// In Redux, almost always expressed as a const in all caps,
// so that it can be exported for use in other parts of the app(such as the reducers)
export const REQUEST_GIFS = 'REQUEST_GIFS';

export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';

// Action types as constants, passing to our action creators
// signInUser() and signOutUser() via required type property
// export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

// For Firebase
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC'; 

// from Firebase console, importing Firebase package,
const config = {
  apiKey: "AIzaSyBtR3H7Ug-luHa1qzxS66lLddDo9JWcouU",
  authDomain: "react-giphy-a6b0b.firebaseapp.com",
  databaseURL: "https://react-giphy-a6b0b.firebaseio.com",
  projectId: "react-giphy-a6b0b",
  storageBucket: "react-giphy-a6b0b.appspot.com",
  messagingSenderId: "1045369758402"
};

Firebase.initializeApp(config);



// Action Creator:
// Action creators are functions that create actions.

// ReduxThunk, is forcing the action creator to hold off,
// on actually dispatching the action object to the reducers
// until the dispatch is called. 
// Although the superagent is still returning a promise,
// the .then(response => {}) resolves that promise,
// giving the actual result of the call.
// It is within that method that we dispatch our action with the resolved data. 
export function requestGifs(term = null) {
  return function(dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function favoriteGif({selectedGif}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;

    // Using Firebase's on method to pass our favorited gifs
    // into the Redux store.
    // on is a listener that fires when the initial data is stored
    // at the specified location, which in this case, our child path
    // with our user ID) and again every time the data changes.
    // it passes a snapshot of this data through the callback,
    // and then dispatching the value of this snapshot to our reducer.

    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
    });
  }
}

  // const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);

  // console.log(term);

  // Action:
  // Plain JavaScript object with two pieces:
  // a type (required) and a payload (only required if,
  // you want to pass data along with your action)

  // BEFORE:
  // return {
  //   type: REQUEST_GIFS,
  //   payload: data
    // term
//   }
// }


// Adding OPEN_MODAL and CLOSE_MODAL with two action creators, openModal() and closeModal().
// openModal() action creator takes a gif as an argument:
// this will be the gif our modal will render.
export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    gif
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

//Action types

// Firebase functions; using redux-thunk
// Both functions are similar but the only difference is between
// createUserWithEmailAndPassword and signInWithEmailAndPassword.

// createUserWithEmailAndPassword, to create a user
export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

// signInWithEmailAndPassword, is to log in an existing user.
export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}
//////////



// Action types as constants, passing to our action creators
// signInUser() and signOutUser() via required type property

// export function signInUser() {
//   return {
//     type: SIGN_IN_USER
//   }
// }

// exporting signOutUser function
export function signOutUser() {
  return function (dispatch) {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT_USER
        })
      });
  }
}

// Before:
// export function signOutUser() {
//   return {
//     type: SIGN_OUT_USER
//   }
// }

// using reduxThunk to conditionally dispatch some actions.
// If the user is signed in, Firebase.auth.onAuthStateChanged()
// will return a valid user object, and we can dispatch our authUser()
// action creator to update authenticated to true on the state. 
// if Firebase.auth.onAuthStateChanged() returns null, it means 
// that the Firebase auth info is no longer valid, so it will call signOutUser()
// to lock the user out of the application until the user signs in again.
// But if the page is refreshed, it still looks like the user is logged out.
// Thus, we need to call verifyAuth() almost as soon as the app boots so
// it can update the state accordingly. 
export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

// instead of having SIGN_IN_USER,
// using AUTH_USER, setting authenticated to true for both
// signing up and logging in.
export function authUser() {
  return {
    type: AUTH_USER
  }
}

// if user is not able to sign up or log in and returns an error,
// authError will catch and in the callback, passing the error
// message to the new authError action creator.
export function authError(error) {
  return{
  type: AUTH_ERROR,
  payload: error
  }
}