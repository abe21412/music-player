import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

class Playlist extends Component {
  renderTrackItem = (track, index) => {
    return (
      <Fragment key={index}>
        <ListItem
          button
          selected={this.props.currentTrack === track} //boolean
          onClick={() => this.props.playTrack(track)}
          disabled={this.props.currentTrack === track}
        >
          <ListItemIcon>
            <img
              src={
                this.props.currentTrack === track
                  ? "round-pause-24px.svg"
                  : "round-play_arrow-24px.svg"
              }
              alt="play"
            />
          </ListItemIcon>
          <ListItemText
            primary={track.name}
            secondary={track.artist !== null ? track.artist : null}
          />
        </ListItem>

        <Divider />
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} id="playlist">
        <List component="nav">
          {this.props.tracks.map(this.renderTrackItem)}
        </List>
      </div>
    );
  }
}

Playlist.propTypes = {
  classes: PropTypes.object.isRequired,
  tracks: PropTypes.array,
  currentTrack: PropTypes.object,
  playTrack: PropTypes.func.isRequired
};

export default withStyles(styles)(Playlist);
