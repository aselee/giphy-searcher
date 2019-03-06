import React from 'react';
import '../styles/App.css';
import SearchBar from '../components/SearchBar';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import request from 'superagent';

// added App.js file to containers folder

class App extends React.Component {

  // now need to initialize gifs object within this.state,
  // so our application is aware that it needs to track
  // changes, but we set it to an empty array. 
  // (look below)

  constructor() {
    super();

    this.state = {
      gifs: [],       // an empty array
      selectedGif: null, // single object
      modalIsOpen: false // boolean
    };
  }

  // this method will accept the selected gif image as an argument
  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  // this method closes and sets it back to null
  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

  // using GiphyAPI to call within handleTermChange method,
  // since it is receiving the term from the SearchBar
  handleTermChange = (term) => {

    // Notice the ${term} in the middle of that string; 
    // this is yet another bit of ES2015 sugar. 
    // Adding ${} to a string allows us to concatenate a variable, 
    // but in order to use this syntax, you must wrap the string 
    // in backticks `` instead of single or double quotation marks.
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=UEihl4oOkElpWfVQ97TdftwELmv1evip`;

    // using GET request
    // now using this.setState to pass the GiphyAPI data,
    // into our components.
    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data })
    });
    // code before:
    // request.get(url, function(err, res) {
    //   console.log(res.body.data[0]);
    // });
  };

  render() {
    return (
      <div>
        <SearchBar
          // setting a new property, onTermChange
          // it becomes availabe with the child component via this.props.
          // Using the onTermChange property to pass the handleTermChange() callback
          // from our App our SearchBar.
          onTermChange={this.handleTermChange}
        />
        <GifList 
          gifs={this.state.gifs}
          onGifSelect={selectedGif => this.openModal(selectedGif)} // to pass into openModal method
        />
        <GifModal 
        // Passing modalIsOpen and selectedGif objects from state
        // Also, passing in closeModal method via prop; whenever our
        // third-party Modal component calls onRequestClose, 
        // such as when clicking outside of the modal or hitting the 
        // "close" button, it will call our App component's closeModal() function.
          modalIsOpen={this.state.modalIsOpen}
          selectedGif={this.state.selectedGif} 
          onRequestClose={ () => this.closeModal()}
        />

      </div>
    );
  }
}

export default App;



  // previous code below:

  // Need to mock up fake data to pass to our components.
  // Adding constructor function and intialize the state 
  // with an array of gifs.
  // Need to call super() to access this.state.
  // creating a GifList component and pace it directly below
  // the SearchBar, passing through the gifs objects,
  // that we set on our App's state as a prop.
  // constructor() {
  //   super();
  //   this.state = {
  //     gifs: [
  //       {
  //         id: 1,
  //         url: 'http://fakeimg.pl/300/'
  //       },
  //       {
  //         id: 2,
  //         url: 'http://fakeimg.pl/300/'
  //       },
  //       {
  //         id: 3,
  //         url: 'http://fakeimg.pl/300/'
  //       }
  //     ]
  //   }
  // }