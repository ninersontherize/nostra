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
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>League</b> Search
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="section">
                <div className="row">
                  <div className="input-field col s6 offset-s1">
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
                  <div className="col s4" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                        Search
                      </button>
                  </div>
                </div>
              </div>
            </form>
            <table className="highlight minwidth: 650" aria-label="simple table">
              <thead>
                <tr>
                  <th>League Name</th>
                  <th className="right-align">Max Players</th>
                  <th className="right-align">Starting Bankroll</th>
                  <th className="right-align">Leagues Supported</th>
                  <th className="right-align">Private</th>
                </tr>
              </thead>
              <tbody>
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td component="th" scope="row">
                      <Link to={`/joinLeague/${row._id}`}>
                        {row.name}
                      </Link>
                    </td>
                    <td className="right-align">{row.max_players}</td>
                    <td className="right-align">{row.starting_cash}</td>
                    <td className="center-align">
                      {row.leagues_supported.map(sub_row => (
                        <span><img src={process.env.PUBLIC_URL + sub_row.tournament_logo} height="25px" width="25px" /> </span>
                      ))}
                    </td>
                    <td className="right-align">{checkPrivate(row.private)}</td>
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

SearchLeague.propTypes = {
  searchLeague: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchLeague })(SearchLeague);