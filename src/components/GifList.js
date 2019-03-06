import React from 'react';
import GifItem from './GifItem';

// GifList, to accept a list of gifs from the App component,
// lookp through them, and render an individual GifItem
// for each object in the array.

// Using Stateless functional component.
// Used whenever our component does not need to actively
// track or modify our application's state.
// The Parent component (App) passes in all of the data
// in GifList needs via its props. 
// The GifList only needs to worry about displaying the data.
const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    return <GifItem key={image.id} 
                    gif={image} 
                    onGifSelect={props.onGifSelect}
                    onFavoriteSelect={props.onFavoriteSelect}
                    onFavoriteDeslect={props.onFavoriteDeselect}
                    isAuthenticated={props.isAuthenticated}
                    isFavorite={props.isFavorite}
            />
  });

  return (
    <div className="gif-list">
      {gifItems}
    </div>
  );
};

export default GifList;