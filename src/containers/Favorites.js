import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import '../styles/App.css';

class Favorites extends React.Component {

  // using componentWillMount method to fetch favorite gifs
  componentWillMount() {
    this.props.actions.fetchFavoritedGifs();
  }

  render() {
    return (
      <div>
        <GifList 
          gifs={ this.props.gifs }
          onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) }
          onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif({selectedGif}) }
          onFavoriteDeselect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
          isAuthenticated={ this.props.authenticated }
          // setting isFavorite as true, so that GifItems know
          // that the inital state on all of the components should be favorited.
          isFavorite={true} 
        />
        <GifModal 
          modalIsOpen={ this.props.modalIsOpen }
          selectedGif={ this.props.selectedGif }
          onRequestClose={ () => this.props.actions.closeModal()}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.favorites,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

// Before; base template
// class Favorites extends React.Component {
//   render() {
//     return <div>Favorites</div>;
//   }
// }

// export default Favorites;