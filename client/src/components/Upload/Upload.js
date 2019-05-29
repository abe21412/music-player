import "./Upload.css";
import React, { Component } from "react";
import DropArea from "./DropArea";
import ProgressBar from "./ProgressBar";
import PropTypes from "prop-types";

class Upload extends Component {
  state = {
    files: [],
    uploading: false,
    progress: {},
    success: false
  };

  onFilesAdded = files => {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
    console.log(this.state);
  };

  uploadFiles = async () => {
    const uploadResults = [];
    this.setState({ progress: {}, uploading: true });
    this.state.files.forEach(file =>
      uploadResults.push(this.sendPostRequest(file))
    );

    try {
      await Promise.all(uploadResults);
      this.setState({ success: true, uploading: false });
    } catch (e) {
      console.log(e);
    }
  };

  sendPostRequest = file => {
    const track = new FormData();
    track.append("name", file.name);
    track.append("track", file);
    console.log(track.get("track"));
    return fetch("/api/tracks/", {
      method: "POST",
      headers: {
        "x-auth-key": localStorage.getItem("token")
      },
      body: track
    })
      .then(res => {
        console.log(res);
        const newProgress = { ...this.state.progress };
        newProgress[file.name] = {
          state: "done"
        };
        this.setState({ progress: newProgress });
      })
      .catch(err => {
        console.log("ERRR", err);
        const newProgress = { ...this.state.progress };
        newProgress[file.name] = { state: "error" };
        this.setState({ progress: newProgress });
      });
  };

  renderProgress = file => {
    const progress = this.state.progress[file.name];
    if (this.state.uploading || this.state.success) {
      return (
        <div className="ProgressWrapper">
          <ProgressBar />
          {progress && progress.state === "done" && (
            <img
              className="CheckIcon"
              alt="done"
              src="baseline-check_circle-24px.svg"
              style={{
                opacity: progress && progress.state === "done" ? 0.5 : 0
              }}
            />
          )}
        </div>
      );
    }
  };

  toggleBtnAction = () => {
    if (this.state.success) {
      return (
        <button
          onClick={() => {
            this.setState({ files: [], success: false }, () => {
              this.props.updateUser();
            });
          }}
        >
          Clear
        </button>
      );
    }
    return (
      <button disabled={this.state.uploading} onClick={this.uploadFiles}>
        Upload
      </button>
    );
  };

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <DropArea
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.success}
          />
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.toggleBtnAction()}</div>
      </div>
    );
  }
}

Upload.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default Upload;
