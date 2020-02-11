import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

class Sidebar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  componentDidMount() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem, {
          edge: "left",
          inDuration: 250
      });
  }

    render() {
      var user_nav;

      if (this.props.auth.user.id !== undefined) {
        user_nav =  <ul id="slide-out" className="sidenav">
                      <li className="sidenav-header">
                        <Link to="/dashboard"
                          style={{
                            fontFamily: "monospace"
                          }}>
                          <span className="sidenav-header">nostra.nav</span>
                        </Link>
                      </li>
                      <li>
                        <div className="divider" />
                      </li>
                      <li className="sidenav-item">
                        <Link to={`/userProfile/${this.props.auth.user.id}`}>
                          <span className="sidenav-item"><b>My</b> Profile</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to="/myWagers">
                          <span className="sidenav-item"><b>My</b> Wagers</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to="/myLeagues">
                          <span className="sidenav-item"><b>My</b> Leagues</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to="/searchMatch">
                          <span className="sidenav-item"><b>Match</b> Search</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to="/searchUser">
                          <span className="sidenav-item"><b>User</b> Search</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to={`/userSettings/${this.props.auth.user.id}`}>
                          <span className="sidenav-item"><b>User</b> Settings</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to="/lcsPowerRankings/week3">
                          <span className="sidenav-item"><b>LCS</b> Power Rankings</span>
                        </Link>
                      </li>
                      <li className="nostra-nav">
                        <Link onClick={this.onLogoutClick}>
                          <span className="sidenav-item">Logout</span>
                        </Link>
                      </li>
                    </ul>
      } else {
        user_nav =  <ul id="slide-out" className="sidenav">
                      <li className="sidenav-header">
                        <Link to="/dashboard"
                          style={{
                            fontFamily: "monospace"
                          }}>
                          <span className="sidenav-header">nostra.nav</span>
                        </Link>
                      </li>
                      <li>
                        <div className="divider" />
                      </li>
                      <li className="sidenav-item">
                        <Link to="/register">
                          <span className="sidenav-item"><b>Sign</b> Up</span>
                        </Link>
                      </li>
                      <li className="sidenav-item">
                        <Link to="/login">
                          <span className="sidenav-item"><b>Log</b> In</span>
                        </Link>
                      </li>
                    </ul>
      }

        return (
          <div>
            <nav className="z-depth-0">
              <div className="nav-wrapper white">
                <ul className="left nostra-nav">
                  <a href="#" data-target="slide-out" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                  </a>
                </ul>

                <Link
                  to="/dashboard"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="col s5 center brand-logo black-text nostra-nav">
                    <i className="material-icons">gamepad</i>
                    nostra.gg
                  </Link>
                  <ul id="nav-mobile" class="left">
                    <li>
                        <button href="#" data-target="slide-out" className="sidenav-trigger btn-flat">
                          <i className="material-icons">menu</i>
                        </button>
                    </li>
                  </ul>
              </div>
            </nav>
            {user_nav}
          </div>
        );
    }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Sidebar);