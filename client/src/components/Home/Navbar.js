import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const styles = () => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    margin: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    },
    marginRight: 0,
    float: "right"
  }
});

class Navbar extends Component {
  classes = this.props.classes;

  state = { top: false };

  toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ top: open });
  };

  fullList = () => (
    <div
      className={this.classes.fullList}
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <List>
        {
          <ListItem
            button
            key={this.props.page === "Upload" ? "Music" : "Upload"}
            onClick={this.props.changePage}
          >
            <ListItemIcon>
              <img
                src={
                  this.props.page === "Upload"
                    ? "round-library_music-24px.svg"
                    : "baseline-cloud_upload-24px.svg"
                }
                alt={this.props.page === "Upload" ? "Music" : "Upload"}
              />
            </ListItemIcon>
            <ListItemText
              primary={this.props.page === "Upload" ? "Music" : "Upload"}
            />
          </ListItem>
        }
        <Divider />
        <ListItem button key={"Logout"} onClick={this.props.logout}>
          <ListItemIcon>
            <img src="baseline-account_box-24px.svg" alt="Logout" />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );

  render() {
    return (
      <Fragment>
        <IconButton
          className={this.classes.button}
          onClick={this.toggleDrawer(true)}
        >
          <img alt="menu" src="round-menu-24px.svg" />
        </IconButton>

        <Drawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer(false)}
        >
          {this.fullList()}
        </Drawer>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired
};

export default withStyles(styles)(Navbar);
