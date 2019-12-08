import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h5>
              Ever feel like you just <b>know</b> who's going to win?
            </h5>
            <p className="flow-text grey-text text-darken-1">
              Use strategy and game knowledge to predict wins, bank gold, and beat your friends.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-flat waves effect waves-light hoverable nostra-button">
                  Register
                </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-flat waves-effect white black-text">
                  Log In
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;