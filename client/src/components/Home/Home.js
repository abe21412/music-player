import React, { Component, Fragment } from "react";
import Upload from "../Upload/Upload";
import Music from "../Music/Music";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

class Home extends Component {
  state = {
    userData: { name: "", email: "", tracks: [] },
    globalTracks: [],
    page: null
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-key": token
        }
      });
      const userData = await res.json();
      if (userData.unauthorized === "INVALID TOKEN") {
        this.props.toggleLoggedIn();
      }
      let globalTracks = await this.fetchGlobalTracks();
      this.setState({ userData, globalTracks }, () => console.log(this.state));
      if (userData.tracks.length === 0) {
        this.setState({ page: "Upload" });
      } else {
        this.setState({ page: "Music" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  fetchGlobalTracks = async () => {
    let res = await fetch("/api/tracks/all", {
      method: "GET",
      headers: {
        "x-auth-key": localStorage.getItem("token")
      }
    });
    let globalTracks = await res.json();
    return globalTracks;
  };

  updateUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-key": token
        }
      });
      const userData = await res.json();
      if (userData.unauthorized === "INVALID TOKEN") {
        this.props.toggleLoggedIn();
      }
      let globalTracks = await this.fetchGlobalTracks();
      this.setState({ userData, globalTracks }, () => console.log(this.state));
    } catch (e) {
      console.log(e);
    }
  };

  changePage = () => {
    if (this.state.page === "Upload") {
      this.setState({ page: "Music" });
    } else if (this.state.page === "Music") {
      this.setState({ page: "Upload" });
    }
  };

  determineComponent = () => {
    if (this.state.page === "Upload") {
      return (
        <div className="Card">
          <Upload updateUser={this.updateUser} />
        </div>
      );
    } else if (this.state.page === "Music") {
      return (
        <Music
          logout={this.props.logout}
          page={this.state.page}
          changePage={this.changePage}
          tracks={this.state.userData.tracks}
          globalTracks={this.state.globalTracks}
        />
      );
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.page === "Upload" && (
          <Navbar
            logout={this.props.logout}
            page={this.state.page}
            changePage={this.changePage}
          />
        )}
        {this.determineComponent()}
      </Fragment>
    );
  }
}

Home.propTypes = {
  toggleLoggedIn: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Home;
