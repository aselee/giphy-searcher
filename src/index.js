import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';



// creating store by calling the
// configureStore() method that was set up in configureStore.js
const store = configureStore();

// wrapping App container in a redux Provider.
// this connects react to the redux store

// using ReactDOM to render the application within
// the div with an id of app in the index.html
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app') // div id in index.html
);





// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// serviceWorker.unregister();
