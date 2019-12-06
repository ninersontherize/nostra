import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    
  }

  render() {
    var logout_button;

    if (this.props.auth.user.id !== undefined) {
      logout_button =   <ul id="nav-mobile" className="right nostra-nav">
                          <li className="nostra-nav">
                            <button
                            onClick={this.onLogoutClick}
                            className="btn-flat waves-effect waves-light"
                            >
                            Logout
                            </button>
                          </li>
                        </ul>
    }

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 center brand-logo black-text nostra-nav">
                <i className="material-icons">gamepad</i>
                nostra.gg
              </Link>
              {logout_button}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
