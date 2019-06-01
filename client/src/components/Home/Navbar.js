import React, { Fragment, useState } from "react";
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
  navButtons: {
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

const Navbar = props => {
  const { classes } = props;
  const [open, toggleOpen] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    toggleOpen(open);
  };
  const NavButtons = () => (
    <div
      className={classes.navButtons}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          key={props.page === "Upload" ? "Music" : "Upload"}
          onClick={props.changePage}
        >
          <ListItemIcon>
            <img
              src={
                props.page === "Upload"
                  ? "round-library_music-24px.svg"
                  : "baseline-cloud_upload-24px.svg"
              }
              alt={props.page === "Upload" ? "Music" : "Upload"}
            />
          </ListItemIcon>
          <ListItemText
            primary={props.page === "Upload" ? "Music" : "Upload"}
          />
        </ListItem>
        <Divider />
        <ListItem button key={"Logout"} onClick={props.logout}>
          <ListItemIcon>
            <img src="baseline-account_box-24px.svg" alt="Logout" />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <Fragment>
      <IconButton className={classes.button} onClick={toggleDrawer(true)}>
        <img alt="menu" src="round-menu-24px.svg" />
      </IconButton>

      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        {NavButtons()}
      </Drawer>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired
};

export default withStyles(styles)(Navbar);
