import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatch, updateMatchTeams } from "../../actions/matchActions";
import { getMyLeagues, showUserLeague } from "../../actions/leagueActions";
import { createWager, getWagersByMatch } from "../../actions/wagerActions";
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
    } else {
      if (wager_team === this.state.home_team._id) {
        wager_odds = this.state.spread_home;
      } else {
        wager_odds = this.state.spread_away;
      }
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

  renderPositiveOdds = odd => {
    if(odd > 0) {
      return `+${odd}`
    } else {
      return odd
    }
  };

  renderOdds = (odd_type, odd) => {
    if(odd > 0 && odd_type === "spread") {
      return `+${odd/1000} K`;
    } else if (odd < 0 && odd_type === "spread") {
      return `${odd/1000} K`;
    } else if (odd > 0) {
      return `+${odd}`;
    } else {
      return odd;
    }
  };

  renderOddType = odd_type => {
    if (odd_type === "spread") {
      return "Spread";
    } else {
      return "Money Line";
    }
  };

  renderMoney = money => {
    if (money === "") {
      return
    } else {
      return `${money}g`
    }
  }

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

    if (this.state.winning_id) {
      this.setState({
        match_complete: true
      });
    }
    M.AutoInit();
  };

  render() {
    const{ errors } = this.state;

    let wager_section;
    let match_date = new Date(this.state.match_date);
    let match_hour = (match_date.getHours() % 12);
    if (match_hour === 0) {
      match_hour = 12;
    }
    let match_minute = (match_date.getMinutes() < 10) ? "0" + match_date.getMinutes() : match_date.getMinutes();
    let match_trailer = (match_date.getHours() > 11) ? " PM PST" : " AM PST";
    let match_time = match_hour + ":" + match_minute + match_trailer;
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

    if (this.state.match_complete === false && this.state.money_line_home !== null && this.state.spread_home !== null) {
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
                        <span className="money-line-odds" title="money-line-odds">{this.renderPositiveOdds(this.state.money_line_home)}</span>
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
                        <span className="money-line-odds">{this.renderPositiveOdds(this.state.money_line_away)}</span>
                      </div>
                    </div> 
                  </td>
                </tr>
                <tr key="money-line">
                  <td className="right-align">
                    <div className={this.state.spread_home > 0 ? "odds-green" : "odds-red"}>
                      <div className="spread">
                        <span className="spread-odds" title="spread-odds">{this.renderPositiveOdds(this.state.spread_home/1000)} K</span>
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
                        <span className="spread-odds">{this.renderPositiveOdds(this.state.spread_away/1000)} K</span>
                      </div>
                    </div> 
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
              <div className="input-field col s3">
                <select id="wager_info" value={this.state.wager_info} onChange={this.onChange}>
                  <option value="" disabled selected>Team</option>
                  <optgroup label="Money-Line">
                    <option value={this.state.home_team._id + "/money_line"}>{this.state.home_team.short_name}</option>
                    <option value={this.state.away_team._id + "/money_line"}>{this.state.away_team.short_name}</option>
                  </optgroup>
                  <optgroup label="Spread">
                    <option value={this.state.home_team._id + "/spread"}>{this.state.home_team.short_name}</option>
                    <option value={this.state.away_team._id + "/spread"}>{this.state.away_team.short_name}</option>
                  </optgroup>
                </select>
                <label>Team and Type of Wager</label>
              </div>
              <div className="input-field col s3">
                <select id="wager_league" value={this.state.wager_league} onChange={this.onLeagueChange}>
                  <option value="" disabled selected>League</option>
                  {this.state.my_leagues.map(row => (
                    <option value={row._id}>{row.league.name}</option>
                  ))}
                </select> 
                <label>League</label>
              </div>
              <div className="input-field inline col s3">
                <input
                  onChange={this.onChange}
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
                  <span className="available-funds">Available Funds: {this.renderMoney(this.state.available_funds)}</span>
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
                className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                  Place Wager
                </button>
              </div>
            </div>
          </form>
        </div>
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
              <span className="gold-diff"> ({this.renderPositiveOdds(this.state.gold_difference)})</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="section">
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
                      <span className="dash-spread-label">{this.renderOddType(row.wager_type)}</span>
                    </div>
                    <div className="row dash-text-container"> 
                      <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                    </div>
                  </td>
                  <td className="right-align dash-info-value-green">{row.payout}g</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                        {match_time}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch, getMyLeagues, createWager, updateMatchTeams, showUserLeague, getWagersByMatch })(withRouter(ShowMatch));