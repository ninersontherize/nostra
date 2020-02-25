import React, { Component } from "react";
import update from "immutability-helper";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchMatchByDateRange } from "../../actions/matchActions";
import { getMyLeagues, showUserLeague } from "../../actions/leagueActions";
import classnames from "classnames"
import { createParlay } from "../../actions/wagerActions";
import { renderOdds, renderMatchTime, renderMoney, renderDifference } from "../../helpers/odds";

const isEmpty = require("is-empty");

class CreateParlay extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      search_results: [],
      display_search_results: [],
      current_filter: "",
      parlay_matches: [],
      wager_amount: "",
      wager_league: "",
      parlay_odds: "",
      my_leagues: [],
      available_funds: "",
      potential_winnings: "",
      potential_difference: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    let wagers = [];
    var wager_type;
    var wager_team;
    var wager_odds;

    this.state.parlay_matches.forEach(match => {
      wager_type = match.wager_info.split("/")[1];
      wager_team = match.wager_info.split("/")[0];

      if (wager_type === "money_line") {
        if (wager_team === match.home_team._id) {
          wager_odds = match.money_line_home;
        } else {
          wager_odds = match.money_line_away;
        }
      } else if (wager_type === "spread") {
        if (wager_team === match.home_team._id) {
          wager_odds = match.spread_home;
        } else {
          wager_odds = match.spread_away;
        }
      } else {
        wager_odds = match.over_under_odds;
      }

      const sub_wager = {
        wager_match: match._id,
        wager_odds: wager_odds,
        wager_team: wager_team,
        wager_type: wager_type
      }

      wagers.push(sub_wager);
    });

    

    const wagerData = {
      parlay_amount: this.state.wager_amount,
      parlay_odds: this.state.parlay_odds,
      parlay_user_league: this.state.wager_league,
      wagers: wagers
    }

    console.log(wagerData);

    this.props.createParlay(wagerData, this.props.history);
          
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

  addWagerClick = row => {
    if (row.added === false) {
      let index = this.state.search_results.findIndex(el => el._id === row._id);
      console.log(index);
      this.setState({
        parlay_matches: this.state.parlay_matches.concat(row),
        search_results: update(this.state.search_results, {[index]: {added: {$set: true}}}),
        display_search_results: update(this.state.display_search_results, {[index]: {added: {$set: true}}})
      });
    }
  };

  removeWagerClick = id => {
    var new_search_results = [];
    console.log(id);

    let index = this.state.search_results.findIndex(el => el._id === id);
    console.log(index);
    
    this.state.parlay_matches.filter(obj => {
      if (obj._id !== id) {
        new_search_results = new_search_results.concat(obj);
      }
    });

    this.setState({
      parlay_matches: new_search_results,
      search_results: update(this.state.search_results, {[index]: {added: {$set: false}}}),
      display_search_results: update(this.state.display_search_results, {[index]: {added: {$set: false}}})
    });
  };

  onAmountChange = e => {
    this.setState({ 
      [e.target.id]: e.target.value
    });

    console.log(this.state.parlay_odds);
    if (this.state.parlay_odds != "") {
      this.setState({
        potential_winnings: (e.target.value*this.state.parlay_odds).toFixed(2),
        potential_difference: ((e.target.value*this.state.parlay_odds) - e.target.value).toFixed(2)
      });
    }
  };

  onLeagueChange = e => {
    this.setState({ 
      [e.target.id]: e.target.value
    });

    this.props.showUserLeague(e.target.value).then(res => {
      this.setState({
        available_funds: res.user_bankroll
      });
    });
  };

  onTeamChange = (row, e) => {
    let index = this.state.parlay_matches.findIndex(el => el._id === row._id);
    this.setState({
      parlay_matches: update(this.state.parlay_matches, {[index]: {[e.target.id]: {$set: e.target.value}}})
    });

    var wager_type;
    var wager_team;
    var wager_odds;
    var items_processed = 0;
    var parlay_odds = 1;

    this.state.parlay_matches.forEach(match => {
      if (match.wager_info === "" && match._id === row._id) {
        wager_type = e.target.value.split("/")[1];
        wager_team = e.target.value.split("/")[0];

        if (wager_type === "money_line") {
          if (wager_team === match.home_team._id) {
            wager_odds = match.money_line_home;
            if (wager_odds < 0) {
              parlay_odds *= ((100/Math.abs(wager_odds)) + 1);
            } else {
              parlay_odds *= ((wager_odds/100) + 1);
            }
          } else {
            wager_odds = match.money_line_away;
            if (wager_odds < 0) {
              parlay_odds *= ((100/Math.abs(wager_odds)) + 1);
            } else {
              parlay_odds *= ((wager_odds/100) + 1);
            }
          }
        } else {
          parlay_odds *= 2;
        }
        console.log(parlay_odds);

      } else if (match.wager_info === "") {
        return;
      } else {
        wager_type = match.wager_info.split("/")[1];
        wager_team = match.wager_info.split("/")[0];

        if (wager_type === "money_line") {
          if (wager_team === match.home_team._id) {
            wager_odds = match.money_line_home;
            if (wager_odds < 0) {
              parlay_odds *= ((100/Math.abs(wager_odds)) + 1);
            } else {
              parlay_odds *= ((wager_odds/100) + 1);
            }
          } else {
            wager_odds = match.money_line_away;
            if (wager_odds < 0) {
              parlay_odds *= ((100/Math.abs(wager_odds)) + 1);
            } else {
              parlay_odds *= ((wager_odds/100) + 1);
            }
          }
        } else {
          parlay_odds *= 2;
        }
        console.log(parlay_odds);
      }

      items_processed++;
      console.log(items_processed === this.state.parlay_matches.length);
      if (items_processed === this.state.parlay_matches.length) {
        if (this.state.wager_amount != "") {
          this.setState({
            parlay_odds: parlay_odds,
            potential_winnings: "",
            potential_difference: ""
          });
        } else {
          this.setState({
            parlay_odds: parlay_odds
          });
          console.log(this.parlay_odds);
        }
      }
    });
    
  };

  componentDidMount() {
    var next_week = new Date();
    next_week.setDate(next_week.getDate() + 7);

    const DateRange = {
      start_date: Date.now(),
      end_date: Date.parse(next_week),
      order: 1
    };

    this.props.searchMatchByDateRange(DateRange).then(res => {
      res.forEach(row => {
        row.added = false;
        row.wager_info = "";
        row.wager_odds = 0;
        if (row.winning_id === null) {
          this.setState({
            search_results: this.state.search_results.concat(row),
            display_search_results: this.state.display_search_results.concat(row)
          });
        }
      });
    });

    this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      res.forEach(row => {
        var items_processed = 0;
        var leagues_supported =[];
        row.league.leagues_supported.forEach(league_row => {
          items_processed++;
          leagues_supported = leagues_supported.concat(league_row.name);
          if (items_processed === row.league.leagues_supported.length) {
            this.setState({
              my_leagues: this.state.my_leagues.concat(row)
            });
          }
        });
      });
    });
  };

  render() {

    const{ errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>Create</b> Parlay
              </h4>
            </div>
            <table className="parlay-table highlight">
              <thead className="parlay-table">
                <tr>
                  <th>League</th>
                  <th className="left-align">Match Date</th>
                  <th></th>
                  <th className="center-align">Match</th>
                  <th></th>
                  <th className="left-align">Money Line</th>
                  <th className="left-align">Spread</th>
                  <th className="center-align">Over/Under</th>
                  <th className="right-align"></th>
                </tr>
              </thead>
              <tbody className="parlay-table">
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
                        <span className="search-info-datetime">{new Date(row.match_date).toDateString()}</span>
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
                    <td className="center-align">
                      <span className="search-info-label">{row.over_under_odds}</span>
                    </td>
                    <td className="center-align">
                      {row.added === true ? <span className="center-align">Included</span> :
                      <button
                        style={{
                          width: "90px",
                          borderRadius: "1px",
                          letterSpacing: "1px",
                          fontSize: "12px"
                        }}
                        onClick={() => this.addWagerClick(row)}
                        className="btn-flat hoverable nostra-button-add-parlay">
                          Add
                      </button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col s10 offset-s1">
            <div className="dash-sub-title">
              Current Parlay
            </div>
            <table className="highlight">
              <thead>
                <tr>
                  <th></th>
                  <th className="center-align">Match</th>
                  <th></th>
                  <th className="center-align">Pick</th>
                  <th className="right-align"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.parlay_matches.map(row => (
                  <tr key={row._id}>
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
                      <div className="input-field">
                        <select className="browser-default" id="wager_info" value={row.wager_info} onChange={(e) => this.onTeamChange(row, e)} error={errors.wager_info}>
                          <option value="" disabled selected>Wager Type & Team</option>
                          <optgroup label="Money-Line">
                            <option value={row.home_team._id + "/money_line"}>{row.home_team.short_name}</option>
                            <option value={row.away_team._id + "/money_line"}>{row.away_team.short_name}</option>
                          </optgroup>
                          <optgroup label="Spread">
                            <option value={row.home_team._id + "/spread"}>{row.home_team.short_name}</option>
                            <option value={row.away_team._id + "/spread"}>{row.away_team.short_name}</option>
                          </optgroup>
                          <optgroup label="Over/Under">
                            <option value="over/over_under">Over</option>
                            <option value="under/over_under">Under</option>
                          </optgroup>
                        </select>
                        <span className="red-text">{errors.wager_info}</span>
                      </div>
                    </td>
                    <td className="right-align">
                      <button
                        style={{
                          width: "90px",
                          borderRadius: "1px",
                          letterSpacing: "1px",
                          fontSize: "12px"
                        }}
                        onClick={() => this.removeWagerClick(row._id)}
                        className="btn-flat waves-effect waves-light hoverable nostra-button-unfollow">
                          Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s4 offset-s1">
              <select className="browser-default" id="wager_league" value={this.state.wager_league} onChange={this.onLeagueChange} error={errors.wager_league}>
                <option value="" disabled selected>League</option>
                {this.state.my_leagues.map(row => (
                  <option value={row._id}>{row.league.name}</option>
                ))}
              </select> 
              <span className="red-text">{errors.wager_league}</span>
            </div>
            <div className="input-field inline col s4">
              <input
                onChange={this.onAmountChange}
                value={this.state.wager_amount}
                error={errors.wager_amount}
                id="wager_amount"
                type="number"
                className={classnames('', { invalid: errors.wager_amount })}
              />
              <label htmlFor="amount">Amount</label>
              <span className="red-text">{errors.amount}</span>
            </div>
            <div className="input-field inline col s3 available-funds">
              <div className="row">
                <span className="available-funds">
                  Available Funds: {renderMoney(this.state.available_funds)}
                  <br />
                  Potential Payout: {renderMoney(this.state.potential_winnings)} {(renderDifference(this.state.potential_difference))}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 wager-submit-button">
              <button
                style={{
                width: "200px",
                borderRadius: "1px",
                letterSpacing: "1px",
              }}
              type="submit"
              className="btn btn-flat hoverable nostra-button">
                Place Wager
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CreateParlay.propTypes = {
  searchMatchByDateRange: PropTypes.func.isRequired,
  getMyLeagues: PropTypes.func.isRequired,
  showUserLeague: PropTypes.func.isRequired,
  createParlay: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createParlay, searchMatchByDateRange, getMyLeagues, showUserLeague })(withRouter(CreateParlay));