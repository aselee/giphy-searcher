import React from 'react';
import { Field, reduxForm } from 'redux-form';

// connecting actions
import { connect } from 'react-redux';
import * as Actions from '../actions';


// adding validation code
const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
    
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email Address'
  }

  if(!values.password) {
    errors.password = "Please enter a password";
  }

  return errors;
};

// Boilerplate for login page
class Login extends React.Component {

  // calling my own handleFormSubmit method
  // Once this.props.handleSubmit() is called,
  // it passes the value of the form as an argument to
  // whatever callback is supplied, which is handleFormSubmit() method.

  handleFormSubmit = (values) => {
    // console.log(values);
    this.props.signInUser(values);
    }

  // Adding validation code
  renderField = ({ input, label, type, meta: { touched, error }}) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{this.props.authenticationError}</div>;
    }
    return <div></div>;
  }


  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">
            Log In Here
          </h2>

          { this.renderAuthenticationError() }

{/* handleSubmit(), is a redux-form method, made available via
this.props by reduxForm()(), that we can attach to the form's onSubmit event handler.
This lets redux-form know that the user is trying to submit the form so it can intercept
it and run validation first. */}
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
           
{/* redux-form provides Field component, which makes it easier to connect 
individual inputs to the Redux Store. The values of the inputs are made 
available via redux-reform's this.props.handleSubmit. */}
            <fieldset className="form-group">
              {/* <label>Email Here</label> */}
              <Field 
                name="email" 
                // component="input" 
                component={this.renderField}
                className="form-control" 
                type="text" 
                // placeholder="Email"
                label="Email"
              />
            </fieldset>

            <fieldset className="form-group">
              {/* <label>Password Here</label> */}
              <Field 
                name="password" 
                // component="input"
                component={this.renderField}
                className="form-control"
                type="password"
                // placeholder="Password"
                label="Password"
              />
            </fieldset>

            <button action="submit" className="btn btn-primary">
              Sign In Here
            </button>

          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'login',
  validate
})(Login));



// using react-redux connect()() since the components now 
// need to be connected to redux in order to have access
// to our signInUser() action creator.
// export default connect(null, Actions)(reduxForm({
//   form: 'login',
//   validate
// })(Login));



// BEFORE: 
// using reduxForm()(), connects the form to Redux.
// In the first set of parentheses, it takes a config object
// that has only one required argument: a unique name for the form.
// This will be set as a key on the store object returned from the FormReducer
// export default reduxForm({
//   form: 'login',
  // adding validate to the reduxForm
//   validate
// })(Login);

