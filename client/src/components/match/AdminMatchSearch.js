import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchMatch, searchMatchByDateRange } from "../../actions/matchActions";
import { checkAdmin } from "../../actions/userActions";
import classnames from "classnames"
import queryString from "query-string"
import { renderOdds, renderMatchTime, renderMatchDate } from "../../helpers/odds";

const isEmpty = require("is-empty");

class AdminMatchSearch extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      search_results: [],
      display_search_results: [],
      current_filter: "",
      admin: false,
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
              display_search_results: res
            });
          });
          
  };

  onFilterClick = id => {
    if (this.state.current_filter === id) {
      this.setState({
        display_search_results: this.state.search_results,
        current_filter: ""
      });
      return;
    }

    var new_search_results = [];
    
    this.state.search_results.filter(obj => {
      if (obj.tournament.name === id || obj.home_team.short_name === id || obj.away_team.short_name === id) {
        new_search_results = new_search_results.concat(obj);
      }
    });

    this.setState({
      display_search_results: new_search_results,
      current_filter: id
    });
  };

  async componentDidMount() {
    const search_values = queryString.parse(this.props.location.search);
    var search;

    search_values.search === undefined ? search = null : search = search_values.search;
    
    this.props.searchMatch(search).then(res => {
      res.forEach(row => {
        if (row.winning_id === null) {
          this.setState({
            search_results: this.state.search_results.concat(row),
            display_search_results: this.state.display_search_results.concat(row)
          });
        }
      });
    });

    await this.props.checkAdmin(this.props.auth.user.id).then(res => {
      this.setState({
        admin: res.admin
      });
      console.log(this.state.admin);
    });
  };

  render() {
    const{ errors } = this.state;
    let search_section;

    if (this.state.admin === false) { 
      search_section = 
        <div className="section">
          <div className="row">
            <h5 className="landing-header">
              Oops! Looks like you made a wrong turn!
            </h5>
            <p className="flow-text grey-text text-darken-1 landing-sub-header">
              Click <Link to="/searchMatch">here</Link> to view the official match search page. 
              <br></ br>
              If you have any questions reach out to us by emailing nostra.help@gmail.com
            </p>
          </div> 
        </div>
    } else {
      search_section = 
            <div className="col s12">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4 className="header-text">
                  <b>Match</b> Search
                </h4>
              </div>
              <table className="long-table highlight">
                <thead className="long-table">
                  <tr>
                    <th>League</th>
                    <th className="left-align">Match Date</th>
                    <th></th>
                    <th className="center-align">Match</th>
                    <th></th>
                    <th className="left-align">Money Line</th>
                    <th className="left-align">Spread</th>
                    <th className="right-align"></th>
                    <th className="right-align"></th>
                  </tr>
                </thead>
                <tbody className="long-table">
                  {this.state.display_search_results.map(row => (
                    <tr key={row._id}>
                      <td>
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.tournament.name)}> 
                          <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                        </button>
                      </td>
                      <td>
                        <div className="row search-info-row-container">
                          <span className="search-info-datetime">{renderMatchDate(new Date(row.match_date))}</span>
                        </div>
                        <div className="row search-info-row-container">
                          <span className="search-info-datetime">{renderMatchTime(new Date(row.match_date))}</span>
                        </div>
                      </td>
                      <td className="right-align" component="th" scope="row">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.home_team.short_name)}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                        </button>
                      </td>
                      <td className="center-align" component="th" scope="row">
                        <Link to={`/showMatch/${row._id}`} className="dash-link">
                          <span className="versus-small">vs.</span>
                        </Link>
                      </td>
                      <td className="left-align" component="th" scope="row">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.away_team.short_name)}>   
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                        </button>
                      </td>
                      <td className="left-align">
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{row.home_team.short_name}: </span> 
                          <span className={row.money_line_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{renderOdds("money_line", row.money_line_home)}</span> 
                        </div>
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{row.away_team.short_name}: </span>
                          <span className={row.money_line_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{renderOdds("money_line", row.money_line_away)}</span>
                        </div>
                      </td>
                      <td className="left-align">
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{row.home_team.short_name}: </span> 
                          <span className={row.spread_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{renderOdds("spread", row.spread_home)}</span> 
                        </div>
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{row.away_team.short_name}: </span>
                          <span className={row.spread_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{renderOdds("spread", row.spread_away)}</span>
                        </div>
                      </td>
                      <td className="center-align"><Link to={`/adminSetOdds/${row._id}`}>Set Odds</Link></td>
                      <td className="right-align"><Link to={`/adminResolveMatch/${row._id}`}>Finalize Scores</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    } 

    return (
      <div className="container">
        <div className="row">
          {search_section}
        </div>
      </div>
    );
  }
}

AdminMatchSearch.propTypes = {
  searchMatch: PropTypes.func.isRequired,
  searchMatchByDateRange: PropTypes.func.isRequired,
  checkAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { checkAdmin, searchMatch, searchMatchByDateRange })(AdminMatchSearch);