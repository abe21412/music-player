import React, { Component } from "react";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: null
  };
  toggleLoggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };
  logout = () => {
    localStorage.removeItem("token");
    this.toggleLoggedIn();
  };
  componentDidMount = async () => {
    let token = localStorage.getItem("token");
    if (token === null) {
      this.setState({ loggedIn: false });
      return;
    }
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-key": token
        }
      });
      if (res.status === 200) {
        this.setState({ loggedIn: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    while (this.state.loggedIn === null) {
      return <div />;
    }
    return (
      <div className="App">
        {!this.state.loggedIn ? (
          <Auth toggleLoggedIn={this.toggleLoggedIn} />
        ) : (
          <Home toggleLoggedIn={this.toggleLoggedIn} logout={this.logout} />
        )}
      </div>
    );
  }
}

export default App;
