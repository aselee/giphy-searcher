import {OPEN_MODAL, CLOSE_MODAL} from '../actions';

// creating a initialState const and setting selectedGif
// to null and modalIsOpen to false, snice these will be
// the default values once the app is started.
// state in this context refers only to the state in the ModalReducer.
const initialState = {
  selectedGif: null,
  modalIsOpen: false
};

export default function modal(state = initialState, action) {
  
  // using the switch statement, similar to GifsReducer.
  // using object spread syntax to copy the state and avoid mutating the state.
  // setting up the modalIsOpen and selectedGif properties
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true,
        selectedGif: action.gif.selectedGif
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false,
        selectedGif: null
      };
      default: 
        return state;
  }
}