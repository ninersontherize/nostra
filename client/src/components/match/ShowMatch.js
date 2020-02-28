import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatch, updateMatchTeams } from "../../actions/matchActions";
import { getMyLeagues, showUserLeague } from "../../actions/leagueActions";
import { createWager, getWagersByMatch, getLosingWagersByMatch } from "../../actions/wagerActions";
import { renderOdds, renderOddType, renderMatchTime, renderMoney, renderDifference } from "../../helpers/odds";
import classnames from "classnames"
import M from "materialize-css";

class ShowMatch extends Component {
  constructor() {
    super();

    this.state = {
      tournament: "",
      home_team: "",
      away_team: "",
      money_line_home: "",
      money_line_away: "",
      spread_home: "",
      spread_away: "",
      over_under_odds: "",
      winning_id: "",
      losing_id: "",
      gold_difference: "",
      match_date: "",
      my_leagues: [],
      match_complete: false,
      wager_info: "",
      wager_league: "",
      wager_amount: "",
      available_funds: "",
      winner_search: [],
      losing_wager_empty: "",
      loser_search: [],
      potential_winnings: "",
      potential_difference: "",
      wager_empty: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
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

  onAmountChange = e => {
    this.setState({ 
      [e.target.id]: e.target.value
    });

    if (this.state.wager_info === "" || e.target.value === "") {
      this.setState({
        potential_winnings: "",
        potential_difference: ""
      });
      return;
    } else {
      var wager_type = this.state.wager_info.split("/")[1];
      var wager_team = this.state.wager_info.split("/")[0];
      var wager_odds;

      if (wager_type === "money_line") {
        if (wager_team === this.state.home_team._id) {
          wager_odds = this.state.money_line_home;
          if (wager_odds < 0) {
            this.setState({
              potential_winnings: parseInt(((100/Math.abs(wager_odds))*parseInt(e.target.value))+parseInt(e.target.value)),
              potential_difference: parseInt(((100/Math.abs(wager_odds))*parseInt(e.target.value)))
            });
          } else {
            this.setState({
              potential_winnings: parseInt(((wager_odds/100)*parseInt(e.target.value))+parseInt(e.target.value)),
              potential_difference: parseInt(((wager_odds/100)*parseInt(e.target.value)))
            });
          }
        } else {
          wager_odds = this.state.money_line_away;
          if (wager_odds < 0) {
            this.setState({
              potential_winnings: parseInt(((100/Math.abs(wager_odds))*parseInt(e.target.value))+parseInt(e.target.value)),
              potential_difference: parseInt(((100/Math.abs(wager_odds))*parseInt(e.target.value)))
            });
          } else {
            this.setState({
              potential_winnings: parseInt(((wager_odds/100)*parseInt(e.target.value))+parseInt(e.target.value)),
              potential_difference: parseInt(((wager_odds/100)*parseInt(e.target.value)))
            });
          }
        }
      } else {
        this.setState({
          potential_winnings: parseInt(e.target.value)*2,
          potential_difference: parseInt(e.target.value)
        });
      }
    }

  };

  onTeamChange = e => {
    this.setState({ 
      [e.target.id]: e.target.value
    });

    if (this.state.wager_amount === "") {
      return;
    } else {
      var wager_type = e.target.value.split("/")[1];
      var wager_team = e.target.value.split("/")[0];
      var wager_odds;

      if (wager_type === "money_line") {
        if (wager_team === this.state.home_team._id) {
          wager_odds = this.state.money_line_home;
          if (wager_odds < 0) {
            this.setState({
              potential_winnings: parseInt(((100/Math.abs(wager_odds))*parseInt(this.state.wager_amount))+parseInt(this.state.wager_amount)),
              potential_difference: parseInt(((100/Math.abs(wager_odds))*parseInt(this.state.wager_amount)))
            });
          } else {
            this.setState({
              potential_winnings: parseInt(((wager_odds/100)*parseInt(this.state.wager_amount))+parseInt(this.state.wager_amount)),
              potential_difference: parseInt(((wager_odds/100)*parseInt(this.state.wager_amount)))
            });
          }
        } else {
          wager_odds = this.state.money_line_away;
          if (wager_odds < 0) {
            this.setState({
              potential_winnings: parseInt(((100/Math.abs(wager_odds))*parseInt(this.state.wager_amount))+parseInt(this.state.wager_amount)),
              potential_difference: parseInt(((100/Math.abs(wager_odds))*parseInt(this.state.wager_amount)))
            });
          } else {
            this.setState({
              potential_winnings: parseInt(((wager_odds/100)*parseInt(this.state.wager_amount))+parseInt(this.state.wager_amount)),
              potential_difference: parseInt(((wager_odds/100)*parseInt(this.state.wager_amount)))
            });
          }
        }
      } else {
        this.setState({
          potential_winnings: parseInt(this.state.wager_amount)*2,
          potential_difference: parseInt(this.state.wager_amount)
        });
      }
    }

  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    var wager_type = this.state.wager_info.split("/")[1];
    var wager_team = this.state.wager_info.split("/")[0];
    var wager_odds;

    if (wager_type === "money_line") {
      if (wager_team === this.state.home_team._id) {
        wager_odds = this.state.money_line_home;
      } else {
        wager_odds = this.state.money_line_away;
      }
    } else if (wager_type === "spread") {
      if (wager_team === this.state.home_team._id) {
        wager_odds = this.state.spread_home;
      } else {
        wager_odds = this.state.spread_away;
      }
    } else {
      wager_odds = this.state.over_under_odds;
    }

    const wagerData = {
      wager_type: wager_type,
      wager_team: wager_team,
      wager_user_league: this.state.wager_league,
      wager_amount: this.state.wager_amount,
      wager_odds: wager_odds,
      wager_match: this.props.match.params.match_id
    }

    this.props.createWager(wagerData, this.props.history);
  };

  getWinner = id => {
    if (id === this.state.home_team._id) {
      return this.state.home_team.logo_small;
    } else {
      return this.state.away_team.logo_small;
    }
  };

  async componentDidMount() {

    await this.props.updateMatchTeams(this.props.match.params.match_id);

    await this.props.showMatch(this.props.match.params.match_id).then(res => {
      this.setState({ 
        tournament: res.tournament,
        home_team: res.home_team,
        away_team: res.away_team,
        money_line_home: res.money_line_home,
        money_line_away: res.money_line_away,
        spread_home: res.spread_home,
        spread_away: res.spread_away,
        over_under_odds: res.over_under_odds,
        winning_id: res.winning_id,
        losing_id: res.losing_id,
        gold_difference: res.gold_difference,
        match_date: res.match_date
      });
    });

    await this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      res.forEach(row => {
        var items_processed = 0;
        var leagues_supported =[];
        row.league.leagues_supported.forEach(league_row => {
          items_processed++;
          leagues_supported = leagues_supported.concat(league_row.name);
          if (items_processed === row.league.leagues_supported.length) {
            if (leagues_supported.includes(this.state.tournament.name)) {
              this.setState({
                my_leagues: this.state.my_leagues.concat(row)
              })
            }
          }
        })
      })
    });

    await this.props.getWagersByMatch(this.props.match.params.match_id).then(res => {
      if (res.length === 0) {
        this.setState({
          wager_empty: true
        });
      }
      
      res.forEach(row => {
        this.props.showUserLeague(row.user_league_id).then(user_league => {
          row.username = user_league.username;
          row.user_id = user_league.user_id;
          row.league_id = user_league.league._id;
          row.user_bankroll = user_league.user_bankroll;
          row.league_name = user_league.league.name;

          if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
          } else {
            row.team_logo = row.match.away_team.logo_small;
          }

          this.setState({
            winner_search: this.state.winner_search.concat(row)
          })
        })
      });
    });

    await this.props.getLosingWagersByMatch(this.props.match.params.match_id).then(res => {
      if (res.length === 0) {
        this.setState({
          losing_wager_empty: true
        });
      }
      
      res.forEach(row => {
        this.props.showUserLeague(row.user_league_id).then(user_league => {
          row.username = user_league.username;
          row.user_id = user_league.user_id;
          row.league_id = user_league.league._id;
          row.user_bankroll = user_league.user_bankroll;
          row.league_name = user_league.league.name;

          if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
          } else {
            row.team_logo = row.match.away_team.logo_small;
          }

          this.setState({
            loser_search: this.state.loser_search.concat(row)
          })
        })
      });
    });

    if (this.state.winning_id) {
      this.setState({
        match_complete: true
      });
    }

    if (this.state.my_leagues.length === 1) {
      this.setState({
        wager_league: this.state.my_leagues[0],
        available_funds: this.state.my_leagues[0].user_bankroll
      });
    }

    M.AutoInit();
  };

  render() {
    const{ errors } = this.state;

    let wager_section;
    let match_date = new Date(this.state.match_date);
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

    if (new Date(this.state.match_date) < Date.now() && this.state.match_complete === false) {
      wager_section = 
        <div className="section">
          <div className="row">
            <h5 className="landing-header">
              Match in Progress!
            </h5>
            <p className="flow-text grey-text text-darken-1 landing-sub-header">
              Check back in an hour or so to get match results!
              <br></ br>
              If you have any questions reach out to us by emailing nostra.help@gmail.com
            </p>
          </div> 
        </div>
    } else if (this.state.match_complete === false && this.state.money_line_home !== null && this.state.spread_home !== null) {
      wager_section = 
      <div className="section">
      <div className="section">
        <div className="row">
          <div className="col s12">
            <span className="sub-title-show-match"><b>Latest</b> Odds</span>
          </div>
          <div className="row info-row">
            <div className="col s12">
              <Link className="info-link" to="/oddsInfo">How do odds affect my wager?</Link>
            </div>
          </div>
          <div className="col s10 offset-s1">
            <table className="striped">
              <tbody>
                <tr key="spread">
                  <td className="right-align">
                    <div className={this.state.money_line_home > 0 ? "odds-green" : "odds-red"}>
                      <div className="money-line">
                        <span className="money-line-odds" title="money-line-odds">{renderOdds("money_line", this.state.money_line_home)}</span>
                      </div>
                    </div>   
                  </td>
                  <td className="center-align">
                    <div className="odds-label">
                      <span className="money-line">Money Line</span>
                    </div>
                  </td>
                  <td className="left-align">
                    <div className={this.state.money_line_away > 0 ? "odds-green" : "odds-red"}>
                      <div className="money-line">
                        <span className="money-line-odds">{renderOdds("money_line", this.state.money_line_away)}</span>
                      </div>
                    </div> 
                  </td>
                </tr>
                <tr key="money-line">
                  <td className="right-align">
                    <div className={this.state.spread_home > 0 ? "odds-green" : "odds-red"}>
                      <div className="spread">
                        <span className="spread-odds" title="spread-odds">{renderOdds("spread", this.state.spread_home)}</span>
                      </div>
                    </div> 
                  </td>
                  <td className="center-align">
                    <div className="odds-label">
                      <div className="row parenthesis">
                        <span className="spread">Spread</span>
                      </div> 
                      <div className="row parenthesis">
                        <span className="spread">(Total Gold)</span>
                      </div>
                    </div>
                  </td>
                  <td className="left-align">
                    <div className={this.state.spread_away > 0 ? "odds-green" : "odds-red"}>
                      <div className="spread">
                        <span className="spread-odds">{renderOdds("spread", this.state.spread_away)}</span>
                      </div>
                    </div> 
                  </td>
                </tr>
                <tr key="money-line">
                  <td className="right-align">
                  </td>
                  <td className="center-align">
                    <div className="odds-label">
                      <div className="odds-label">
                        <span className="spread">Over/Under (Kills): {this.state.over_under_odds}</span>
                      </div> 
                    </div>
                  </td>
                  <td className="left-align">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>      
      <div className="divider"></div>
      <div className="section">
        <div className="row">
          <div className="col s12">
            <h5 className="sub-title-show-match-wager">
              Place a wager
            </h5>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row wager-info-container">
              <div className="hide-on-med-and-down input-field col s3">
                <select id="wager_info" value={this.state.wager_info} onChange={this.onTeamChange} error={errors.wager_info}>
                  <option value="" disabled selected>Wager</option>
                  <optgroup label="Money-Line">
                    <option value={this.state.home_team._id + "/money_line"}>{this.state.home_team.short_name}</option>
                    <option value={this.state.away_team._id + "/money_line"}>{this.state.away_team.short_name}</option>
                  </optgroup>
                  <optgroup label="Spread">
                    <option value={this.state.home_team._id + "/spread"}>{this.state.home_team.short_name}</option>
                    <option value={this.state.away_team._id + "/spread"}>{this.state.away_team.short_name}</option>
                  </optgroup>
                  <optgroup label="Over/Under">
                    <option value="over/over_under">Over</option>
                    <option value="under/over_under">Under</option>
                  </optgroup>
                </select>
                <label>Type of Wager</label>
                <span className="red-text">{errors.wager_info}</span>
              </div>
              <div className="hide-on-large-only input-field col s3">
                <select className="browser-default" id="wager_info" value={this.state.wager_info} onChange={this.onTeamChange} error={errors.wager_info}>
                  <option value="" disabled selected>Wager Type & Team</option>
                  <optgroup label="Money-Line">
                    <option value={this.state.home_team._id + "/money_line"}>{this.state.home_team.short_name}</option>
                    <option value={this.state.away_team._id + "/money_line"}>{this.state.away_team.short_name}</option>
                  </optgroup>
                  <optgroup label="Spread">
                    <option value={this.state.home_team._id + "/spread"}>{this.state.home_team.short_name}</option>
                    <option value={this.state.away_team._id + "/spread"}>{this.state.away_team.short_name}</option>
                  </optgroup>
                  <optgroup label="Over/Under">
                    <option value="over/over_under">Over</option>
                    <option value="under/over_under">Under</option>
                  </optgroup>
                </select>
                <span className="red-text">{errors.wager_info}</span>
              </div>
              <div className="hide-on-med-and-down input-field col s3">
                <select id="wager_league" value={this.state.wager_league} onChange={this.onLeagueChange} error={errors.wager_league}>
                  <option value="" disabled selected>League</option>
                  {this.state.my_leagues.map(row => (
                    <option value={row._id}>{row.league.name}</option>
                  ))}
                </select> 
                <label>League</label>
                <span className="red-text">{errors.wager_league}</span>
              </div>
              <div className="hide-on-large-only input-field col s3">
                <select className="browser-default" id="wager_league" value={this.state.wager_league} onChange={this.onLeagueChange} error={errors.wager_league}>
                  <option value="" disabled selected>League</option>
                  {this.state.my_leagues.map(row => (
                    <option value={row._id}>{row.league.name}</option>
                  ))}
                </select> 
                <span className="red-text">{errors.wager_league}</span>
              </div>
              <div className="input-field inline col s3">
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
      </div>
    </div>
    } else if (this.state.match_complete === true && this.state.wager_empty !== true) {
      wager_section = 
      <div className="section">
        <div className="section">
          <div className="row">
            <div className="col s5 offset-s1 winner-label">
              <span className="winner-label">Match Winner: </span>
            </div>
            <div className="col s1">
              <img className="show-match-winner-img" src={process.env.PUBLIC_URL + this.getWinner(this.state.winning_id)} />
            </div>
            <div className="col s4 gold-diff">
              <span className="gold-diff"> ({renderOdds("spread", this.state.gold_difference)})</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="section">
          <h4 className="profile-sub-title">
            Biggest Wins
          </h4>
          <table className="highlight dash-table-center">
            <thead>
              <tr>
                <th>League</th>
                <th className="center-align">User</th>
                <th className="center-align">Pick</th>
                <th className="center-align">Amount</th>
                <th className="center-align">Odds</th>
                <th className="right-align">Payout</th>
              </tr>
            </thead>
            <tbody>  
              {this.state.winner_search.map(row => (
                <tr className="dash-row" key={row._id}>
                  <td className="dash-league-name" component="th" scope="row">
                    <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                      {row.league_name}
                    </Link>
                  </td>
                  <td className="center-align dash-league-name" component="th" scope="row">
                    <Link className="dash-link" to={`/userProfile/${row.user_id}`}>
                      {row.username}
                    </Link>
                  </td>
                  <td className="center-align" component="th" scope="row">           
                    <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                  </td>
                  <td className="center-align">{row.amount}g</td>
                  <td className="center-align">
                    <div className="row dash-text-container">
                      <span className="dash-spread-label">{renderOddType(row.wager_type)}</span>
                    </div>
                    <div className="row dash-text-container"> 
                      <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{renderOdds(row.wager_type, row.odds)}</span> 
                    </div>
                  </td>
                  <td className="right-align dash-info-value-green">{row.payout - row.amount}g</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="profile-sub-title">
            Biggest Losses
          </h4>
          <table className="highlight dash-table-center">
            <thead>
              <tr>
                <th>League</th>
                <th className="center-align">User</th>
                <th className="center-align">Pick</th>
                <th className="center-align">Amount</th>
                <th className="right-align">Odds</th>
              </tr>
            </thead>
            <tbody>  
              {this.state.loser_search.map(row => (
                <tr className="dash-row" key={row._id}>
                  <td className="dash-league-name" component="th" scope="row">
                    <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                      {row.league_name}
                    </Link>
                  </td>
                  <td className="center-align dash-league-name" component="th" scope="row">
                    <Link className="dash-link" to={`/userProfile/${row.user_id}`}>
                      {row.username}
                    </Link>
                  </td>
                  <td className="center-align" component="th" scope="row">           
                    <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                  </td>
                  <td className="center-align">{row.amount}g</td>
                  <td className="right-align">
                    <div className="row dash-text-container">
                      <span className="dash-spread-label">{renderOddType(row.wager_type)}</span>
                    </div>
                    <div className="row dash-text-container"> 
                      <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{renderOdds(row.wager_type, row.odds)}</span> 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    } else if (this.state.match_complete === true) {
      wager_section = 
      <div className="section">
        <div className="section">
          <div className="row">
            <div className="col s5 offset-s1 winner-label">
              <span className="winner-label">Match Winner: </span>
            </div>
            <div className="col s1">
              <img className="show-match-winner-img" src={process.env.PUBLIC_URL + this.getWinner(this.state.winning_id)} />
            </div>
            <div className="col s4 gold-diff">
              <span className="gold-diff"> ({renderOdds("spread", this.state.gold_difference)})</span>
            </div>
          </div>
        </div>
      </div>
    } else {
      wager_section = 
        <div className="section">
          <div className="row">
            <h5 className="landing-header">
              Odds Coming Soon!
            </h5>
            <p className="flow-text grey-text text-darken-1 landing-sub-header">
              We strive to update odds 5 days ahead of scheduled match start
              <br></ br>
              If you have any questions reach out to us by emailing nostra.help@gmail.com
            </p>
          </div> 
        </div>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>Match</b> Information
              </h4>
            </div>
            <div className="row">
              <div className="section">
                <div className="col s4">
                    <img src={home_logo} alt="Home Team logo" className="show-match-img"/>
                </div>
                <div className="col s4">
                  <div className="section">
                    <div className="league-and-date-container">
                      <img className="show-match-tournament-img" src={process.env.PUBLIC_URL + this.state.tournament.tournament_logo} />
                      <div className="match-date">
                        {match_date.toDateString()}
                      </div>
                      <div className="match-time">
                        {renderMatchTime(match_date)}
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                </div>
                <div className="col s4">
                    <img src={away_logo} alt="Away Team logo" className="show-match-img"/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s4">
                <div className="team-record">
                  <span className="record" title="home-team-record">{this.state.home_team.wins}-{this.state.home_team.losses}</span>
                </div>
              </div>
              <div className="col s4">
                <span className="versus">vs.</span>
              </div>
              <div className="col s4">
                <div className="team-record">
                  <span className="record" title="away-team-record">{this.state.away_team.wins}-{this.state.away_team.losses}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s4">
                <div className="team-record-vs-spread">
                  <span className="record" title="home-team-record">Vs Spread: ({this.state.home_team.winsVsSpread}-{this.state.home_team.lossesVsSpread})</span>
                </div>
              </div>
              <div className="col s4">
              </div>
              <div className="col s4">
                <div className="team-record-vs-spread">
                  <span className="record" title="away-team-record">Vs Spread: ({this.state.away_team.winsVsSpread}-{this.state.away_team.lossesVsSpread})</span>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            {wager_section}
          </div>
        </div>
      </div>
    );
  }
}

ShowMatch.propTypes = {
  showMatch: PropTypes.func.isRequired,
  getMyLeagues: PropTypes.func.isRequired,
  updateMatchTeams: PropTypes.func.isRequired,
  createWager: PropTypes.func.isRequired,
  showUserLeague: PropTypes.func.isRequired,
  getWagersByMatch: PropTypes.func.isRequired,
  getLosingWagersByMatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch, getMyLeagues, createWager, updateMatchTeams, showUserLeague, getWagersByMatch, getLosingWagersByMatch })(withRouter(ShowMatch));