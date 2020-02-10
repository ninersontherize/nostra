import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { showUser, editUserPreferences } from "../../actions/userActions";
import { getTeams } from "../../actions/teamActions";
import classnames from "classnames";
import M from "materialize-css";

class UserSettings extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      favorite_team: "",
      status: "",
      team_list: [],
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });

    console.log(this.state.favorite_team);
    console.log(e.target.id);
    console.log(e.target.value);
  };

  onSubmit = async e => {
    e.preventDefault();

    if (this.props.auth.user.id !== this.props.match.params.user_id) {
      return;
    }

    const userAttributes = {
      status: this.state.status,
      favorite_team: this.state.favorite_team
    };

    this.props.editUserPreferences(this.props.auth.user.id, userAttributes, this.props.history);
  };

  async componentDidMount() {
    await this.props.showUser(this.props.auth.user.id).then(res => {
      this.setState({
        username: res.username,
        favorite_team: res.favorite_team,
        status: res.status
      });
    });

    await this.props.getTeams().then(res => {
      this.setState({ team_list: res });
    });

    console.log(this.state.team_list);

    M.AutoInit();
  };

  render() {
    const{ errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>User</b> Settings
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="section">
                <div className="hide-on-med-and-down input-field col s8 offset-s2">
                  <select id="favorite_team" value={this.state.favorite_team} onChange={this.onChange}>
                  <option value="" disabled selected>Choose a team to rep</option>
                  {this.state.team_list.map(row => (
                    <option value={row._id}>
                      {row.name}
                    </option>
                  ))}
                  </select>
                  <label>Favorite Team</label>
                </div>
                <div className="hide-on-large-only input-field col s8 offset-s2">
                  <select className="browser-default" id="favorite_team" value={this.state.favorite_team} onChange={this.onChange}>
                  <option value="" disabled selected>Favorite Team</option>
                  {this.state.team_list.map(row => (
                    <option value={row._id}>
                      {row.name}
                    </option>
                  ))}
                  </select>
                </div>
                <div className="row row-input-field-bottom">
                  <div className="input-field col s8 offset-s2">
                    <input
                      onChange={this.onChange}
                      value={this.state.status}
                      error={errors.status}
                      id="status"
                      type="text"
                      className={classnames('', { invalid: errors.status })}
                    />
                    <label htmlFor="name">User Status</label>
                    <span className="red-text">{errors.status}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "250px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                        Save Changes
                      </button>
                  </div>
                  <Link
                    style={{
                      width: "250px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    to="/dashboard"
                    className="btn btn-flat waves-effect waves-light hoverable nostra-button-unfollow">
                      Leave Without Saving
                  </Link>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UserSettings.propTypes = {
  showUser: PropTypes.func.isRequired,
  editUserPreferences: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showUser, editUserPreferences, getTeams })(withRouter(UserSettings));