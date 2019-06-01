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
    paddingBottom: theme.spacing.unit * 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  }
});

const Register = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    let form = new FormData(document.getElementById("registration"));
    let user = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("psw"),
      pwConfirm: form.get("psw-confirm")
    };
    if (user.password !== user.pwConfirm) {
      return alert("Passwords Must Match");
    }
    try {
      let headers = { "Content-Type": "application/json" };
      let res = await fetch("/api/auth/register", {
        method: "POST",
        headers,
        body: JSON.stringify(user)
      });
      //log user in after registration
      if (res.ok) return props.toggleForm();
      let errors = await res.json();
      return alert(errors.email);
    } catch (e) {
      console.log(e);
    }
  };
  const { classes } = props;

  return (
    <div className="register-main">
      <Paper className={classes.root} elevation={6}>
        <Typography variant="h5" component="h3">
          <form name="registration" id="registration" onSubmit={handleSubmit}>
            <div className="container">
              <h1
                style={{ textAlign: "center", marginTop: 0, marginBottom: 0 }}
              >
                Register
              </h1>
              <p style={{ textAlign: "center", marginTop: 0, paddingTop: 0 }}>
                Create An Account
              </p>
              <hr style={{ marginBottom: "10px" }} />
              <label htmlFor="name">
                <b>Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                required
              />
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

              <label htmlFor="psw-confirm">
                <b>Confirm Password</b>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="psw-confirm"
                required
              />
              <input
                type="submit"
                className="submitbtn"
                placeholder="Register"
              />
              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  onClick={props.toggleForm}
                  id="registered"
                >
                  Already Registered?
                </button>
              </div>
            </div>
          </form>
        </Typography>
      </Paper>
    </div>
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleForm: PropTypes.func.isRequired
};

export default withStyles(styles)(Register);
