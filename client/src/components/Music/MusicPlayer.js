import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Navbar from "../Home/Navbar";

const styles = () => ({
  card: {
    display: "flex",
    flexDirection: "column"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  content: {
    flex: "1 0 auto",
    margin: "auto",
    padding: "10px 0"
  },
  cover: {
    width: "90%",
    margin: "auto"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 1,
    paddingBottom: 1
  },
  button: {
    margin: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&:disabled": {
      backgroundColor: "transparent"
    },
    marginBottom: "30px"
  }
});

class MusicPlayer extends Component {
  classes = this.props.classes;
  state = { playing: null, currentTrack: null };
  componentDidUpdate() {
    if (this.state.playing === null && this.props.currentTrack) {
      this.setState({
        playing: true,
        currentTrack: this.props.currentTrack
      });
    }
  }
  playPrevious = () => {
    let currentTrackIndex = this.props.tracks.indexOf(this.props.currentTrack);
    if (currentTrackIndex === 0 || !this.props.currentTrack) return;
    let prevTrack = this.props.tracks[currentTrackIndex - 1];
    this.setState({ currentTrack: prevTrack, playing: true }, () =>
      this.props.playTrack(prevTrack)
    );
  };
  playNext = () => {
    let currentTrackIndex = this.props.tracks.indexOf(this.props.currentTrack);
    if (
      currentTrackIndex === this.props.tracks.length - 1 ||
      !this.props.currentTrack
    )
      return;
    let nextTrack = this.props.tracks[currentTrackIndex + 1];
    this.setState({ currentTrack: nextTrack, playing: true }, () =>
      this.props.playTrack(nextTrack)
    );
  };
  togglePlayback = () => {
    if (!this.props.currentTrack) {
      this.props.playTrack(this.props.tracks[0]);
    }
    if (this.state.playing) {
      this.setState({ playing: false }, this.props.pauseTrack());
    } else if (this.state.playing === null) {
      return;
    } else {
      this.setState({ playing: true }, this.props.resumeTrack());
    }
  };

  render() {
    if (this.props.audioData) {
      this.props.audioData.src.onended = e => {
        console.log("ended");
        this.playNext();
      };
    }
    return (
      <Card elevation={5} className={this.classes.card}>
        <Navbar
          logout={this.props.logout}
          page={this.props.page}
          changePage={this.props.changePage}
        />
        <span>
          {
            <CardMedia
              style={{ height: "50vh" }}
              className={this.classes.cover}
              image="http://pngimg.com/uploads/music_notes/music_notes_PNG33.png"
              alt="music note"
            />
          }
        </span>
        <Divider />
        <div className={this.classes.details}>
          <CardContent className={this.classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.currentTrack && this.props.currentTrack.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.currentTrack && this.props.currentTrack.artist}
            </Typography>
          </CardContent>
          <div className={this.classes.controls}>
            <IconButton
              className={this.classes.button}
              onClick={this.playPrevious}
              disableRipple={this.props.currentTrack && !this.props.audioData}
              disabled={this.props.currentTrack && !this.props.audioData}
              aria-label="Previous"
            >
              <img src="round-skip_previous-24px.svg" alt="prev" />
            </IconButton>
            <IconButton
              className={this.classes.button}
              onClick={this.togglePlayback}
              disableRipple={this.props.currentTrack && !this.props.audioData}
              disabled={this.props.currentTrack && !this.props.audioData}
              aria-label="Play/pause"
            >
              <img
                src={
                  !this.state.playing
                    ? "round-play_arrow-24px.svg"
                    : "round-pause-24px.svg"
                }
                alt="play/pause"
              />
            </IconButton>
            <IconButton
              className={this.classes.button}
              onClick={this.playNext}
              disableRipple={this.props.currentTrack && !this.props.audioData}
              disabled={this.props.currentTrack && !this.props.audioData}
              aria-label="Next"
            >
              <img src="round-skip_next-24px.svg" alt="next" />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

MusicPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  tracks: PropTypes.array,
  currentTrack: PropTypes.object,
  playTrack: PropTypes.func.isRequired,
  resumeTrack: PropTypes.func.isRequired,
  pauseTrack: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired,
  audioData: PropTypes.object
};

export default withStyles(styles)(MusicPlayer);
