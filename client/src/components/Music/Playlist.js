import React, { Fragment } from "react";
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

const Playlist = props => {
  const { classes, playTrack, currentTrack, tracks } = props;
  const renderTrackItem = (track, index) => {
    return (
      <Fragment key={index}>
        <ListItem
          button
          selected={currentTrack === track}
          onClick={() => playTrack(track)}
        >
          <ListItemIcon>
            <img
              src={
                currentTrack === track
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
  return (
    <div className={classes.root} id="playlist">
      <List>{tracks.map(renderTrackItem)}</List>
    </div>
  );
};

Playlist.propTypes = {
  classes: PropTypes.object.isRequired,
  tracks: PropTypes.array,
  currentTrack: PropTypes.object,
  playTrack: PropTypes.func.isRequired
};

export default withStyles(styles)(Playlist);
