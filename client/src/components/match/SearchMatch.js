import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchMatch, searchMatchByDateRange } from "../../actions/matchActions";
import classnames from "classnames"
import queryString from "query-string"

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

    var searchData;

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

  UNSAFE_componentWillReceiveProps = nextProps => {
    if(nextProps.location.key !== this.props.location.key) {
      window.location.reload();
    }
  }

  componentDidMount() {
    const search_values = queryString.parse(this.props.location.search);
    var search;

    search_values.search === undefined ? search = null : search = search_values.search;
    
    this.props.searchMatch(search).then(res => {
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
              <h4 className="header-text">
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
                      className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                        Search
                      </button>
                  </div>
                </div>
              </div>
            </form>
            <table className="long-table highlight">
              <thead className="long-table">
                <tr>
                  <th>League</th>
                  <th className="center-align">Match</th>
                  <th className="right-align">Money Line</th>
                  <th className="right-align">Spread</th>
                  <th className="right-align">Match Date</th>
                  <th className="right-align"></th>
                </tr>
              </thead>
              <tbody className="long-table">
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td>
                    <Link to={`/searchMatch?search=${row.tournament.name}`}>   
                      <img width="40px" height="40px" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                    </Link>
                    </td>
                    <td className="center-align" component="th" scope="row">
                      <span>
                      <Link to={`/searchMatch?search=${row.home_team.short_name}`}> 
                        <img width="55px" height="23px" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                      </Link>
                      </span>
                      <span className="versus-small">vs.</span>
                      <span>
                      <Link to={`/searchMatch?search=${row.away_team.short_name}`}>   
                        <img width="55px" height="23px" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                      </Link>
                      </span>
                    </td>
                    <td className="right-align">
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{row.home_team.short_name}: </span> 
                        <span className={row.money_line_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.money_line_home)}</span> 
                      </div>
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{row.away_team.short_name}: </span>
                        <span className={row.money_line_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.money_line_away)}</span>
                      </div>
                    </td>
                    <td className="right-align">
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{row.home_team.short_name}: </span> 
                        <span className={row.spread_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.spread_home/1000)} K</span> 
                      </div>
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{row.away_team.short_name}: </span>
                        <span className={row.spread_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderPositiveOdds(row.spread_away/1000)} K</span>
                      </div>
                    </td>
                    <td className="right-align">{new Date(row.match_date).toDateString()}</td>
                    <td className="right-align"><Link to={`/showMatch/${row._id}`}>Match Page</Link></td>
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