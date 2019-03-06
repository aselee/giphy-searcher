import React from 'react';

// simplifying SearchBar 
// original code in SearchBar Draft file

class SearchBar extends React.Component {
  // no need for constructor,
  // due to no longer needing to initialize the state.

  // App container is wired into Redux,
  // and will not be needed this.setState() in onInputChange()
  
  // The App component is going to pass the REQUEST_GIFS action
  // to the SearchBar; using the onINputChange function.
  onInputChange(term) {
    this.props.onTermChange(term);
  }
  
  render () {
    return (
      <div className="search">
        <input placeholder="Search for gifs!"
          // every time the input is updated,
          // React's onChange property automatically fires.
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }
}

export default SearchBar;
