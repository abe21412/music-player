import React, { Component } from "react";
import "./DropArea.css";
import PropTypes from "prop-types";

class DropArea extends Component {
  constructor(props) {
    super(props);
    this.state = { highlight: false };
    this.fileInputRef = React.createRef();
  }

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  };

  onFilesAdded = e => {
    if (this.props.disabled) return;
    const files = e.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  };

  onDragOver = e => {
    e.preventDefault();
    if (this.props.disabed) return;
    this.setState({ highlight: true });
  };

  onDragLeave = () => {
    this.setState({ highlight: false });
  };

  onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.disabed) return;
    const files = e.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  };

  fileListToArray = list => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  render() {
    return (
      <div
        className={`DropArea ${this.state.highlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          accept="audio/*"
          onChange={this.onFilesAdded}
        />
        <img
          alt="upload"
          className="Icon"
          src="baseline-cloud_upload-24px.svg"
        />
        <span>Upload Files</span>
      </div>
    );
  }
}

DropArea.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default DropArea;
