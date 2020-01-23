import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLeague } from "../../actions/leagueActions";
import classnames from "classnames"

const isEmpty = require("is-empty");

class SearchLeague extends Component {
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

  onSubmit = async e => {
    e.preventDefault();

    var searchData;

    if (!isEmpty(this.state.search)) {
      searchData = this.state.search;
    }

    await this.props.searchLeague(searchData).then(res => {
            this.setState({ 
              search: "",
              search_results: res 
            });
          });
  };

  componentDidMount() {
    this.props.searchLeague().then(res => {
      this.setState({ search_results: res });
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
                <b>League</b> Search
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
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
            </form>
            <table className={(this.state.search_results.length < 7) ? "highlight" : "highlight long-table"}>
              <thead>
                <tr>
                  <th>League Name</th>
                  <th className="center-align">Max Players</th>
                  <th className="center-align">Starting Bankroll</th>
                  <th className="center-align">Leagues Supported</th>
                  <th className="right-align">Private</th>
                </tr>
              </thead>
              <tbody>
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td component="th" scope="row">
                      <Link to={`/joinLeague/${row._id}`} className="dash-link">
                        {row.name}
                      </Link>
                    </td>
                    <td className="center-align">{row.max_players}</td>
                    <td className="center-align">{row.starting_cash}</td>
                    <td className="center-align">
                      {row.leagues_supported.map(sub_row => (
                        <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + sub_row.tournament_logo} />
                      ))}
                    </td>
                    <td className="right-align">{checkPrivate(row.private)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="section">
              <div className="row">
                <Link
                  to="/createLeague"
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-flat waves effect waves-light hoverable nostra-button">
                    Create New League
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchLeague.propTypes = {
  searchLeague: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchLeague })(SearchLeague);