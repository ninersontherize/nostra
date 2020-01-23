import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchUser } from "../../actions/userActions";
import { showTeam } from "../../actions/teamActions";
import classnames from "classnames"

const isEmpty = require("is-empty");

class SearchUser extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      search_results: [],
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    var searchData;

    if (!isEmpty(this.state.search)) {
      searchData = this.state.search;
    }

    this.props.searchUser(searchData).then(res => {
      res.forEach(row => {
        if (row.favorite_team === null || row.favorite_team === undefined) {
          row.favorite_team_logo = "/lcs/lcs_logo.png";
          this.setState({
            search_results: this.state.search_results.concat(row).sort((a, b) => (a.favorite_team_logo < b.favorite_team_logo) ? 1 : -1)
          });
        } else {
          this.props.showTeam(row.favorite_team).then(team_res => {
            row.favorite_team_logo = team_res.logo_small;
            this.setState({
              search_results: this.state.search_results.concat(row).sort((a, b) => (a.favorite_team_logo < b.favorite_team_logo) ? 1 : -1)
            });
          });
        }
      });
    });

  };

  componentDidMount() {
    this.props.searchUser().then(res => {
      res.forEach(row => {
        if (row.favorite_team === null || row.favorite_team === undefined) {
          row.favorite_team_logo = "/lcs/lcs_logo.png";
          this.setState({
            search_results: this.state.search_results.concat(row).sort((a, b) => (a.favorite_team_logo < b.favorite_team_logo) ? 1 : -1)
          });
        } else {
          this.props.showTeam(row.favorite_team).then(team_res => {
            row.favorite_team_logo = team_res.logo_small;
            this.setState({
              search_results: this.state.search_results.concat(row).sort((a, b) => (a.favorite_team_logo < b.favorite_team_logo) ? 1 : -1)
            });
          });
        }
      });
    });
  };

  render() {
    const{ errors } = this.state;

    function checkPrivate(value) {
      if( value === true) {
        return "Yes"
      } else {
        return "No"
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>User</b> Search
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="section">
                <div className="row">
                  <div className="input-field col s6 offset-s2">
                    <input
                      onChange={this.onChange}
                      value={this.state.search}
                      error={errors.search}
                      id="search"
                      type="text"
                      className={classnames('', { invalid: errors.search })}
                    />
                    <label htmlFor="name">Search</label>
                    <span className="red-text">{errors.search}</span>
                  </div>
                  <div className="col s1" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-flat hoverable nostra-button">
                        Search
                      </button>
                  </div>
                </div>
              </div>
            </form>
            <table className="striped long-table col s6 offset-s3">
              <tbody className="long-table">
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td component="th" scope="row">
                      <Link to={`/userProfile/${row._id}`} className="dash-link">
                        {row.username}
                      </Link>
                    </td>
                    <td className="right-align">
                      <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.favorite_team_logo} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

SearchUser.propTypes = {
  searchUser: PropTypes.func.isRequired,
  showTeam: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchUser, showTeam })(SearchUser);