import React from "react";
import "./Auth.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    height: "10%",
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  }
});

function Login(props) {
  const { classes } = props;
  const userLogin = async e => {
    e.preventDefault();
    let form = new FormData(document.getElementById("login"));
    let loginData = {
      email: form.get("email"),
      password: form.get("psw")
    };
    try {
      let headers = { "Content-Type": "application/json" };
      let res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers
      });
      if (res.status !== 200) return alert("Wrong User/Password Combination");
      let userData = await res.json();
      localStorage.setItem("token", userData.token);
      props.toggleLoggedIn();
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <div>
      <Paper className={classes.root} elevation={6}>
        <Typography variant="h5" component="h3">
          <form name="login" id="login" onSubmit={userLogin}>
            <div className="container">
              <h1 style={{ textAlign: "center" }}>Log In</h1>

              <hr />

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                required
              />
              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <input type="submit" className="submitbtn" placeholder="Log In" />
              <div style={{ textAlign: "center" }}>
                <button onClick={props.toggleForm} id="registered">
                  Don't Have An Account?
                </button>
              </div>
            </div>
          </form>
        </Typography>
      </Paper>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleLoggedIn: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
