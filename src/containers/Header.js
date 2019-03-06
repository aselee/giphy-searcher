import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Actions from '../actions';


// Bootstrap navbar 
// Using Link to navigate through the app instantly
// Replacing <a> tags with <Link>, let react-router-dom know it should 
// swap out the component passed into the App instead of refreshing the page.

class Header extends React.Component {

  // Don't need to call mapsDispatchToProps and bindActionCreators to hook the action creators into an container.
  // The header doesn't have any child components, so we can just pass in Actions
  // directly in order to make signOutUser() available on this.props.
  handleSignout() {
    this.props.signOutUser();
  }


  // Extracting away the conditional logic needed to redner the links into its own method.
  // authenticated is being made available from the AuthReducer via mapStateToProps,
  // and if it's set to true, it will return the links to "My Favs" and "Sign Out", 
  // since that's what signed-in users should see.

  // Returning with an array of <li>, since any sort of React render() method,
  // we have to return a single element, which is why we're always wrapping things in <div> tags.
  // However wrapping a group of <li>s within a <div> inside of a <ul> isn't very clean.
  // Can instead return an array of comma-separated <li> and react will list them in order.
  // The only thing that is needed in order to do this, is to give the lists a key prop, so they are unique.
  renderAuthLinks() {
    if(this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/favorites">My Favs</Link>
        </li>,
        <li className="nav-item" key={2}>
          {/* The reason that the "Sign Out" link is not a <Link>, is because we're not actually
          routing anywhere when the link is clicked; instead, we're calling the handleSignout() method
          to fire the signOutUser() action creator. */}
          <a className="nav-link" href="/" onClick={() => this.handleSignout()}>Sign Out</a>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            {/* <a href="/" className="navbar-brand">ReactGiphyy</a> */}
            <Link className="navbar-brand" to="/">ReactGiphySearch</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">

            {this.renderAuthLinks()}
            {/* <li className="nav-item"> */}
              {/* <a className="nav-link" href="/login">Login Here</a> */}
              {/* <Link ClassName="nav-link" to="/login">Login Here</Link> */}
            {/* </li> */}
            {/* <li className="nav-item"> */}
              {/* <a className="nav-link" href="/signup">Sign in</a> */}
              {/* <Link className="nav-link" to="/signup">Sign in</Link> */}
            {/* </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(Header);