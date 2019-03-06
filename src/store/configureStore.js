// Redux store

import { createStore, compose, applyMiddleware } from 'redux';
// import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';
// importing history package dependency from react-router
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import * as Actions from '../actions';

// using redux-thunk
import reduxThunk from 'redux-thunk';

export const history = createHistory();

// exporting history object and removing default from configureStore() method,
// since configureStore method is no longer being exported by default.
// export default function configureStore (initialState) {

export function configureStore(initialState) {

  // using redux's createStore function to create the store.
  // passing the store to the rootReducer,
  // so that the can update the state tree of the app.

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // using reduxThunk instead of redux promise
      applyMiddleware(reduxThunk, routerMiddleware(history)),
      // added routerMiddleware
      // applyMiddleware(ReduxPromise, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    // adding redux dev tools chrome extension to access the store.
  );
  
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // importing ACtions and dispatching the object
  store.dispatch(Actions.verifyAuth());

  return store;
}