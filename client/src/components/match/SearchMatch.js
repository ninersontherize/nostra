import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchMatch, searchMatchByDateRange } from "../../actions/matchActions";
import classnames from "classnames"

const isEmpty = require("is-empty");

class SearchMatch extends Component {
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

    var searchData = {}

    if (!isEmpty(this.state.search)) {
      searchData = this.state.search;
    }

    await this.props.searchMatch(searchData).then(res => {
            this.setState({ 
              search: "",
              search_results: res 
            });
            console.log(this.state.search_results);
          });
          
  };

  componentDidMount() {
    this.props.searchMatch().then(res => {
      this.setState({ search_results: res });
    });
  };

  render() {
    const{ errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s10 offset-s1">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Search</b> for a match
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.search}
                  error={errors.search}
                  id="search"
                  type="text"
                  className={classnames('', { invalid: errors.search })}
                />
                <label htmlFor="name">Search for a team, league, or match date</label>
                <span className="red-text">{errors.search}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Search
                  </button>
              </div>
            </form>
            <table className="highlight minwidth: 750" aria-label="simple table">
              <thead>
                <tr>
                  <th align="right">League</th>
                  <th align="right" margin-left="10">Match</th>
                  <th align="right">Money Line</th>
                  <th align="right">Spread</th>
                  <th align="right">Match Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td align="right"><img width="40px" height="40px" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} /></td>
                    <td component="th" scope="row">
                      <img width="60px" height="25px" src={process.env.PUBLIC_URL + row.home_team.logo_small} />v.<img width="60px" height="25px" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                    </td>
                    <td align="right">{row.home_team.short_name}: {row.money_line_home} / {row.away_team.short_name}: {row.money_line_away}</td>
                    <td align="right">{row.home_team.short_name}: {row.spread_home} / {row.away_team.short_name}: {row.spread_away}</td>
                    <td align="right">{new Date(row.match_date).toDateString()}</td>
                    <td align="right"><Link to={`/showMatch/${row._id}`}>More Info</Link></td>
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

SearchMatch.propTypes = {
  searchMatch: PropTypes.func.isRequired,
  searchMatchByDateRange: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchMatch, searchMatchByDateRange })(SearchMatch);