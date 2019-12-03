import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatch, updateMatchTeams } from "../../actions/matchActions";
import { getMyLeagues } from "../../actions/leagueActions";
import { createWager } from "../../actions/wagerActions";
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
      my_leauges: [],
      match_complete: false,
      wager_info: "",
      wager_league: "",
      wager_amount: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

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
      return this.state.home_team.logo_large;
    } else {
      return this.state.away_team.logo_large;
    }
  };

  renderPositiveOdds = odd => {
    if(odd > 0) {
      return `+${odd}`
    } else {
      return odd
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
        winning_id: res.winning_id,
        losing_id: res.losing_id,
        gold_difference: res.gold_difference,
        match_date: res.match_date
      });
    });

    await this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      this.setState({
        my_leauges: res
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
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

    if ((this.state.match_complete === false)) {
      wager_section = 
      <div className="section">
        <div className="row">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h5>
              <b>Place a wager</b>
            </h5>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s3">
              <select id="wager_info" value={this.state.wager_info} onChange={this.onChange}>
                <option value="" disabled selected>Team</option>
                <optgroup label="Money-Line">
                  <option value={this.state.home_team._id + "/money_line"}>{this.state.home_team.short_name}</option>
                  <option value={this.state.away_team._id + "/money_line"}>{this.state.away_team.short_name}</option>
                </optgroup>
                <optgroup label="Spread">
                  <option value={this.state.home_team._id + "/spread"}>{this.state.home_team.short_name}</option>
                  <option value={this.state.home_team._id + "/spread"}>{this.state.away_team.short_name}</option>
                </optgroup>
              </select>
              <label>Team and Type of Wager</label>
            </div>
            <div className="input-field col s3">
              <select id="wager_league" value={this.state.wager_league} onChange={this.onChange}>
                <option value="" disabled selected>League</option>
                {this.state.my_leauges.map(row => (
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
            <div className="col s3" style={{ paddingLeft: "30px" }}>
              <button
                style={{
                width: "200px",
                borderRadius: "1px",
                letterSpacing: "1px",
                marginTop: "20%"
              }}
              type="submit"
              className="btn waves-effect waves-light hoverable blue accent-3">
                Place Wager
              </button>
            </div>
          </form>
        </div>
      </div>
    } else {
      wager_section = 
      <div className="section">
        <div className="row">
          <div className="col s7 winner-label">
            <span className="winner-label">Match Winner: </span>
          </div>
          <div className="col s1 winner-image">
            <span className="winner-image"><img src={process.env.PUBLIC_URL + this.getWinner(this.state.winning_id)} height="70px" width="70px" /></span>
          </div>
          <div className="col s4 gold-diff">
            <span className="gold-diff"> ({this.renderPositiveOdds(this.state.gold_difference)})</span>
          </div>
        </div>
      </div>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Match</b> Information
              </h4>
            </div>
            <div className="row">
              <div className="section">
                <div className="col s4">
                  <div className="section">
                    <img src={home_logo} alt="Home Team logo" width="100" height="100"/>
                    <div className="team-info">
                      <span className="team-short-name" title="home-team">{this.state.home_team.short_name}</span> 
                    </div>
                    <div className="team-record">
                      <span className="record" title="home-team-record">{this.state.home_team.wins}-{this.state.home_team.losses}</span>
                    </div>
                  </div>
                </div>
                <div className="col s4">
                  <div className="section">
                    <div className="league-and-date-container">
                      <img height="50px" width="50px" src={process.env.PUBLIC_URL + this.state.tournament.tournament_logo} />
                      <div className="match-date">
                        {new Date(this.state.match_date).toDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="section">
                    <div className="versus-container">
                      <span className="versus">vs.</span>
                    </div> 
                  </div>
                </div>
                <div className="col s4">
                  <div className="section">
                    <img src={away_logo} alt="Away Team logo" width="100" height="100"/>
                    <div className="team-info">
                      <span className="team-short-name" title="away-team">{this.state.away_team.short_name}</span>
                    </div>
                    <div className="team-record">
                      <span className="record" title="away-team-record">{this.state.away_team.wins}-{this.state.away_team.losses}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="section">
              <div className="row">
                <div className="col s12">
                  <span className="sub-title-show-match"><b>Latest</b> Odds</span>
                </div>
                <div className="odds-container">
                  <div className="col s3">
                    <div className="section">
                      <div className={this.state.money_line_home > 0 ? "odds-green" : "odds-red"}>
                        <div className="money-line">
                          <span className="money-line-odds" title="money-line-odds">{this.renderPositiveOdds(this.state.money_line_home)}</span>
                        </div>
                      </div> 
                    </div>                   
                    <div className="section">
                      <div className={this.state.spread_home > 0 ? "odds-green" : "odds-red"}>
                        <div className="spread">
                          <span className="spread-odds" title="spread-odds">{this.renderPositiveOdds(this.state.spread_home/1000)} K</span>
                        </div>
                      </div> 
                    </div>
                  </div>
                  <div className="col s3">
                    <div className="section"> 
                      <div className="odds-label">
                        <span className="money-line">Money Line</span>
                      </div>
                    </div>                   
                    <div className="section">
                      <div className="odds-label">
                        <div className="row parenthesis">
                          <span className="spread">Spread</span>
                        </div> 
                        <div className="row parenthesis">
                          <span className="spread">(Total Gold)</span>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div className="col s3">
                    <div className="section">
                      <div className={this.state.money_line_away > 0 ? "odds-green" : "odds-red"}>
                        <div className="money-line">
                          <span className="money-line-odds">{this.renderPositiveOdds(this.state.money_line_away)}</span>
                        </div>
                      </div> 
                    </div>
                    <div className="section">
                      <div className={this.state.spread_away > 0 ? "odds-green" : "odds-red"}>
                        <div className="spread">
                          <span className="spread-odds">{this.renderPositiveOdds(this.state.spread_away/1000)} K</span>
                        </div>
                      </div> 
                    </div>
                  </div>
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch, getMyLeagues, createWager, updateMatchTeams })(withRouter(ShowMatch));