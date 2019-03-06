import { REQUEST_GIFS, FETCH_FAVORITED_GIFS } from '../actions';

const initialState = {
  // setting initiate state for reducer by setting a 
  // data property to an empty array.
  // this helps avoid any issues with gifs coming back as
  // null or undefined. 
  data: [],
  favorites: []
};

// action argument handles any action dispatched in our application.
// switch statements, check for any actions that the reducer
// cares about or if it does not care, it will retrun the state as default.

export default function gifs(state = initialState, action) {
  switch(action.type) {
    case REQUEST_GIFS:
      return {
        // object spread syntax
        ...state, data: action.payload.body.data
      };
    // Since the gifs are from Giphy, are being returned as an array,
    // but theyre being returned as a single jSON object from Firebase.
    // We can however iterate through our Firebase response object
    // and add it to an empty array, and then return that array from our reducer.
    case FETCH_FAVORITED_GIFS:
      var arr = [];
      for(var i in action.payload) {
        if (action.payload.hasOwnProperty(i)) {
          arr.push(action.payload[i]);
        }
      }
      return {
        ...state, favorites: arr
      };

    default:
      return state;
  }
}
// // dummy data hard-coded list of gifs

// export default function() {
//   return [
//     {
//       id: 1,
//       url: 'http://fakeimg.pl/300/'
//     },
//     {
//       id: 2,
//       url: 'http://fakeimg.pl/300/'
//     },
//     {
//       id: 3,
//       url: 'http://fakeimg.pl/300/'
//     }
//   ];
// }