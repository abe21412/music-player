import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500]
    }
  },
  checked: {}
})(Switch);

class SwitchPlaylist extends Component {
  state = {
    checked: true
  };

  handleChange = e => {
    this.setState({ checked: e.target.checked });
    this.props.togglePlaylist();
  };
  render() {
    return (
      <FormGroup>
        <FormControlLabel
          style={{ marginLeft: 0 }}
          control={
            <PurpleSwitch
              checked={this.state.checked}
              onChange={this.handleChange}
              value="checked"
            />
          }
          label={
            this.state.checked ? "Showing Your Tracks" : "Showing All Tracks"
          }
        />
      </FormGroup>
    );
  }
}

SwitchPlaylist.propTypes = {
  togglePlaylist: PropTypes.func.isRequired
};

export default SwitchPlaylist;
