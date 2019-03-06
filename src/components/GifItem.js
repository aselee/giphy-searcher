import React from 'react';

class GifItem extends React.Component {
  
  // Although we are using action and reducers when anything affects the app store,,
  // However, we're only managing a small piece of UI here and trying to keep track in the Redux store,
  // whether all of the individual GifItems are favorited would require commplex codes.
  // nothing wrong using React's State for minor UI changes on individual components,
  // but if its going to affect other parts of the app or involves an external API call,
  // probably should use dispatch an action instead. 
  constructor(props) {
    // passing through props as an argument.
    // allows us to have access to this.props within the constructor.
    // but not needed unless trying to pass props through to local state.
    super(props);
    this.state = {favorited: this.props.isFavorite};
  }


  // Setting the favorited key on state, so know whether 
  // to render a filled-in or empty heart to show whether a gif has been favorited or not.
  favoriteGif() {
    this.setState({favorited: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({favorited: false });
    this.props.onFavoriteSelect(this.props.gif);
  }

// Also using the props onFavoriteSelect and onFavoriteDeslect to fire actions
  renderFavoriteHeart = () => {
    if (! this.props.isAuthenticated ){
      return '';
    }

    if(this.state.favorited) {
      return <i className="favorite fa fa-heart" 
        onClick={() => this.unfavoriteGif()}/>;
    }
      return <i className="favorite fa fa-heart-o"
        onClick={() => this.favoriteGif()}/>;
  };

  render () {
    return (
      <div className="gif-item">
        {this.renderFavoriteHeart()}
        <img alt="fav" src={this.props.gif.images.downsized.url} 
          onClick={() => this.props.onGifSelect(this.props.gif)}/>
      </div>
    );
  }
}

export default GifItem;

// Before; vanilla react code, boilerplate

// const GifItem = ({gif, onGifSelect}) => {
//   return (
    // need to pass onGifSelect as a prop
    // from GifList to GifItem
//     <div className="gif-item" onClick={() => onGifSelect(gif)}>
//       <img src={gif.images.downsized.url} alt="gif"/>
//     </div>
//   )
// };

// export default GifItem;