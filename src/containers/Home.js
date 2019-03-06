import React from 'react';
// importing the connect property from react-redux,
// connect is needed when to link React and Redux (two separate libraries)
// the react-redux package will pull from the Redux's state and React as props.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// importing all (expressed with *) exported modules
// in actions/index.js file as a single object, Actions.
// This will give the access to all of the action creators,
// so that it can be hooked to our components.
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import '../styles/App.css';


class Home extends React.Component {
  // passing requstGifs action creator to SearchBar
  // via the onTermChange prop.
  // whenever the onInputChange method is fired by entering
  // text in the input, action creator will be fired as well.
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestGifs}/>
        {/* adding onGifSelect prop to GifList and passing in the selectedGif
        argument being sent all the way up to GifItem component.  */}
        <GifList gifs={this.props.gifs} 
          onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) } 
          onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif({selectedGif}) }
          onFavoriteDeslect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
          isAuthenticated={ this.props.authenticated }
        />
        {/* Adding GifModal with modalIsOpen and selectedGif when being passed through as props */}
        <GifModal modalIsOpen={ this.props.modalIsOpen }
          selectedGif={ this.props.selectedGif }
          onRequestClose={ () => this.props.actions.closeModal() }
        />
      </div>
    );
  }
}

// mapStateToProps functions allows the App component
// to subscribe to the Redux store update; 
// whenever there are changes in the store.

// linking mapStateToProps function with reducers.
// linking the gifs from GifsReducer to this.props.gifs
// in the App component.
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.data,
    // modalIsOpen and selectedGif being added to App's props
    // from Redux store via mapDispatchToProps.
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

// mapDispatchToProps is the second, optional argument that
// passes to react-redu'x connect()() method.

// Setting this.props.actions on the App by calling
// Redux's bindActionCreators method.
// bindActionCreators takes a single object whose values
// are action creators (in this case, our Actions object
// that was imported from src/actions/index.js) and
// wraps every action creator in a dispatch call, 
// so that they can be invoked within our container.
// that is how the app is notified that there is a state change.
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

// mapDispatchToProps passes data from the container to the store.
// It provides the ability for the container to tell the store
// that it needs to change and enables this by adding action
// creators to the container as props

// mapStateToProps passes data to our container from the store.
// It makes the result of reducer available to the container as props.
