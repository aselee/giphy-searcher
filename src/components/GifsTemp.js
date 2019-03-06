import React from 'react';

// combined temp code of GifList and GifItem

// Having ({gifs}) as a parameter,
// means that this function is expecting an object
// passed in a property of gifs.
// Rather than passing in an object with that property,
// and then accessing gifs in our functino as objectNameHere.gifs
// this syntax allows to pull out the gifs property of any object 
// that is passed in, and automatically assigns it to a variable,
// named gifs. 
// If passing {title: 'stuff', gifs:'abc} into this function,
// the function would have a gifs variable available to it that was equal to 'abc'.
const GifsTemp = ( {gifs} ) => {
  const gifItems = gifs.map ((gif) => {
    return(
      <li key={gif.id}>
        <img src={gif.url} alt="gifURL"/>
      </li>
    );
  });

  return (
    <ul className="gif-list">
      {gifItems}
    </ul>
  );
};

export default GifsTemp;