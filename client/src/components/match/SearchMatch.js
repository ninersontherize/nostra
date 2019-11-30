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

  renderPositiveOdds = odd => {
    if(odd > 0) {
      return `+${odd}`
    } else {
      return odd
    }
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
                <b>Match</b> Search
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="section">
                <div className="row">
                  <div className="input-field col s5 offset-s2">
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
                  <div className="col s4" style={{ paddingLeft: "11.250px", float: "left" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn waves-effect waves-light hoverable blue accent-3">
                        Search
                      </button>
                  </div>
                </div>
              </div>
            </form>
            <table className="highlight minwidth: 750" aria-label="simple table">
              <thead>
                <tr>
                  <th align="right">League</th>
                  <th className="align-left" marginLeft="60px">Match</th>
                  <th className="align-left">Money Line</th>
                  <th className="align-left">Spread</th>
                  <th className="align-left">Match Date</th>
                  <th className="align-left"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td align="right"><img width="40px" height="40px" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} /></td>
                    <td component="th" scope="row">
                      <span>
                      <img width="60px" height="25px" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                      </span>
                      <span className="versus-small">vs.</span>
                      <span>
                        <img width="60px" height="25px" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                      </span>
                    </td>
                    <td className="align-right">
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{row.home_team.short_name}: </span> 
                        <span className={row.money_line_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.money_line_home)}</span> 
                      </div>
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{row.away_team.short_name}: </span>
                        <span className={row.money_line_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.money_line_away)}</span>
                      </div>
                    </td>
                    <td className="align-right">
                      <div className="row search-info-row-container">
                          <span className="search-info-label">{row.home_team.short_name}: </span> 
                          <span className={row.spread_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.spread_home/1000)} K</span> 
                        </div>
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{row.away_team.short_name}: </span>
                          <span className={row.spread_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.spread_away/1000)} K</span>
                        </div>
                      </td>
                    <td className="align-right">{new Date(row.match_date).toDateString()}</td>
                    <td className="align-right"><Link to={`/showMatch/${row._id}`}>More Info</Link></td>
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