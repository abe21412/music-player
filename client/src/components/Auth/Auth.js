import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import PropTypes from "prop-types";

class Auth extends Component {
  state = {
    alreadyRegistered: true
  };

  toggleForm = () => {
    this.setState({ alreadyRegistered: !this.state.alreadyRegistered });
  };

  render() {
    return (
      <main>
        {this.state.alreadyRegistered ? (
          <Login
            toggleForm={this.toggleForm}
            toggleLoggedIn={this.props.toggleLoggedIn}
          />
        ) : (
          <Register toggleForm={this.toggleForm} />
        )}
      </main>
    );
  }
}

Auth.propTypes = {
  toggleLoggedIn: PropTypes.func.isRequired
};

export default Auth;
