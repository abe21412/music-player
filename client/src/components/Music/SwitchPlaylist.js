import React, { useState } from "react";
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

const SwitchPlaylist = props => {
  const [checked, toggleChecked] = useState(true);
  const { togglePlaylist } = props;
  const handleChange = e => {
    toggleChecked(e.target.checked);
    togglePlaylist();
  };
  return (
    <FormGroup>
      <FormControlLabel
        style={{ marginLeft: 0 }}
        control={
          <PurpleSwitch
            checked={checked}
            onChange={handleChange}
            value="checked"
          />
        }
        label={checked ? "Showing Your Tracks" : "Showing All Tracks"}
      />
    </FormGroup>
  );
};

SwitchPlaylist.propTypes = {
  togglePlaylist: PropTypes.func.isRequired
};

export default SwitchPlaylist;
