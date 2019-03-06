import React from 'react';
import { Field, reduxForm } from 'redux-form';

// connecting actions
// need to connect signInUser() action creator
import { connect } from 'react-redux';
import * as Actions from '../actions';



// Creating sign up page with validiation code

const validate = values => {
  const errors = {};
// checking the email, password, and passwordConfirmation
// have a value. Using Regex in the email value to make 
// sure it is a valid email address. 
// Then comparing both password and passwordConfirmation values
// to make sure they match.


  if (!values.email) {
    errors.email = "Need an email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email"
  }
  
  if (!values.password) {
    errors.password = "Please enter a password";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords don't match.";
  }

  return errors;
};

class Signup extends React.Component {
  handleFormSubmit = (values) => {
    // console.log(values);
    // this.props.signInUser(values);
    this.props.signUpUser(values);
  };

// Difference between Login and Signup, is that there is a passwordConfirmation field.
// Instead of using input to the component property, using this.renderField.
// Redux-form accepts three default DOM inputs: input, which we used in the Login form,
// along with textarea, and select. If more customizations are needed, Field will also
// accept a custom component or stateless function.

// {...} syntax is used when you wrap a component or a stateless function,
// and Field automatically passes it a number of props. By adding the syntax
// to the HTML input element with {...input}, this we desctruct the value of the input prop
// and merging in the values provided by the field component.
  
  // Used before:
  // renderField = ({input, label, type, meta: {touched, error}}) => (
  //   <fieldset className="form-group">
  //     <label>{label}</label>
  //     <div>
  //       <input {...input} 
  //         placeholder={label} 
  //         className="form-control" 
  //         type={type}
  //       />

/* the conditional checks if the user has "touched" - or clicked into -
the field, and not to show any display errors before the user gets to 
have a chance to interact with the field. If there is an error attached,
it will display the error message. */
  //       {touched && error && <span>{error}</span>}
  //     </div>
  //   </fieldset>
  // );

    
  
  // Updated:

  // adding a ternary conditional to check whether the fields have errors,
  // and if the field has been touched and has an error,
  // Bootstrap class of has-error on fieldset will be activated.
  // Also adding Bootstrap class control-label to the labels and help-block
  // to the actual error text. Now if there is an error on a form, red color will show.
  renderField = ({ input, label, type, meta: { touched, error }}) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type}/>
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
          <h2 className="text-center">Sign up here</h2>

          { this.renderAuthenticationError() }

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field 
              name="email" 
              type="text" 
              component={this.renderField} 
              label="Email"
            />
            <Field 
              name="password" 
              type="password" 
              component={this.renderField} 
              label="Password"
            />
            <Field 
              name="passwordConfirmation" 
              type="password" 
              component={this.renderField} 
              label="Password confirmation" 
            />
            <button action="submit" className="btn btn-primary">Sign up</button>
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
  form: 'signup',
  validate
})(Signup));

// export default connect(null, Actions)(reduxForm({
//   form: 'signup',
//   validate
// })(Signup));


// validate function added as an argument to reduxForm
// configuration object at the bottom of the file so 
// that the information, along with the form name, will be passed
// to the FormReducer.

// Before:
// export default reduxForm({
//   form: 'signup',
//   validate
// }) (Signup);


// Boilerplate code
// class Signup extends React.Component {
//   render() {
//     return <div>Signup Here</div>;
//   }
// }

// export default Signup;