import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class EmailSent extends Component {
  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to Home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>Email</b> sent successfully!
              </h4>
              <p className="grey-text text-darken-1 dash-info-text">
                Your reset link is on its way!
                Please allow a few minutes for it to show up in your inbox and be sure to check your spam folder if you do not see it right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailSent.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(EmailSent);