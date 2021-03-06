import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateMatchOdds } from "../../actions/wagerActions";
import { showMatch, updateMatchTeams } from "../../actions/matchActions";
import { checkAdmin } from "../../actions/userActions";
import classnames from "classnames"
import M from "materialize-css";

class AdminSetOdds extends Component {
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
      match_complete: false,
      admin: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    const oddsData = {
      money_line_home: this.state.money_line_home,
      money_line_away: this.state.money_line_away,
      spread_home: this.state.spread_home,
      spread_away: this.state.spread_away,
      over_under_odds: this.state.over_under_odds
    }

    this.props.updateMatchOdds(this.props.match.params.match_id, oddsData, this.props.history);
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
        over_under_odds: res.over_under_odds,
        spread_home: res.spread_home,
        spread_away: res.spread_away,
        winning_id: res.winning_id,
        losing_id: res.losing_id,
        gold_difference: res.gold_difference,
        match_date: res.match_date
      });
    });

    await this.props.checkAdmin(this.props.auth.user.id).then(res => {
      this.setState({
        admin: res.admin
      });
    });

    if (this.state.winning_id) {
      this.setState({
        match_complete: true
      });
    }
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
    let match_trailer = (match_date.getHours() > 11) ? " PM" : " AM";
    let match_time = match_hour + ":" + match_minute + match_trailer;
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

    if (this.state.admin === false || this.state.match_complete === true) { 
      wager_section = 
        <div className="section">
          <div className="row">
            <h5 className="landing-header">
              Oops! Looks like you made a wrong turn!
            </h5>
            <p className="flow-text grey-text text-darken-1 landing-sub-header">
              Click <Link to={`/showMatch/${this.props.match.params.match_id}`}>here</Link> to view the official match page for this match. 
              <br></ br>
              If you have any questions reach out to us by emailing nostra.help@gmail.com
            </p>
          </div> 
        </div>
    } else {
      wager_section = 
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s8 offset-s2">
                <input
                  onChange={this.onChange}
                  value={this.state.money_line_home}
                  error={errors.money_line_home}
                  id="money_line_home"
                  type="number"
                  className={classnames('', { invalid: errors.money_line_home })}
                />
                <label htmlFor="name">Money Line ({this.state.home_team.name})</label>
                <span className="red-text">{errors.money_line_home}</span>
              </div>
              <div className="input-field col s8 offset-s2">
                <input
                  onChange={this.onChange}
                  value={this.state.money_line_away}
                  error={errors.money_line_away}
                  id="money_line_away"
                  type="number"
                  className={classnames('', { invalid: errors.money_line_away })}
                />
                <label htmlFor="name">Money Line ({this.state.away_team.name})</label>
                <span className="red-text">{errors.money_line_away}</span>
              </div>
              <div className="input-field col s8 offset-s2">
                <input
                  onChange={this.onChange}
                  value={this.state.spread_home}
                  error={errors.spread_home}
                  id="spread_home"
                  type="number"
                  className={classnames('', { invalid: errors.spread_home })}
                />
                <label htmlFor="name">Spread ({this.state.home_team.name})</label>
                <span className="red-text">{errors.spread_home}</span>
              </div>
              <div className="input-field col s8 offset-s2">
                <input
                  onChange={this.onChange}
                  value={this.state.spread_away}
                  error={errors.spread_away}
                  id="spread_away"
                  type="number"
                  className={classnames('', { invalid: errors.spread_away })}
                />
                <label htmlFor="name">Spread ({this.state.away_team.name})</label>
                <span className="red-text">{errors.spread_away}</span>
              </div>
              <div className="input-field col s8 offset-s2">
                <input
                  onChange={this.onChange}
                  value={this.state.over_under_odds}
                  error={errors.over_under_odds}
                  id="over_under_odds"
                  type="number"
                  className={classnames('', { invalid: errors.over_under_odds })}
                />
                <label htmlFor="name">Over/Under</label>
                <span className="red-text">{errors.over_under_odds}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-flat hoverable nostra-button">
                    Update Odds
                  </button>
              </div>
            </form>
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

AdminSetOdds.propTypes = {
  showMatch: PropTypes.func.isRequired,
  updateMatchTeams: PropTypes.func.isRequired,
  checkAdmin: PropTypes.func.isRequired,
  updateMatchOdds: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch, updateMatchTeams, checkAdmin, updateMatchOdds })(withRouter(AdminSetOdds));