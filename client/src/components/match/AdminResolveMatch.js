import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resolveWagers, rollbackWagers, resolveParlays } from "../../actions/wagerActions";
import { showMatch, updateMatchTeams, setResult } from "../../actions/matchActions";
import { checkAdmin } from "../../actions/userActions";
import { updateRecord, updateSpreadRecord } from "../../actions/teamActions";
import classnames from "classnames"
import M from "materialize-css";

class AdminSetOdds extends Component {
  constructor() {
    super();

    this.state = {
      tournament: "",
      home_team: "",
      away_team: "",
      winning_team: "",
      losing_team: "",
      gold_difference: "",
      kills: "",
      match_date: "",
      match_complete: false,
      admin: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onTeamChange = e => {
    this.setState({ 
      [e.target.id]: e.target.value
    });

    if (e.target.value === this.state.home_team._id) {
      this.setState({
        losing_team: this.state.away_team._id
      });
    } else {
      this.setState({
        losing_team: this.state.home_team._id
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    const matchData = {
      winning_id: this.state.winning_team,
      losing_id: this.state.losing_team,
      gold_difference: this.state.gold_difference,
      kills: this.state.kills
    }

    //set the Result
    this.props.setResult(this.props.match.params.match_id, matchData);
  };

  onAwayTeamUpdateClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    this.props.updateRecord(this.state.away_team._id);
  }

  onHomeTeamUpdateClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    this.props.updateRecord(this.state.home_team._id);
  }

  onAwayTeamUpdateSpreadClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    this.props.updateSpreadRecord(this.state.away_team._id);
  }

  onHomeTeamUpdateSpreadClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    this.props.updateSpreadRecord(this.state.home_team._id);
  }

  onResolveWagerClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    //resolve all the wagers linked to this match
    this.props.resolveWagers(this.props.match.params.match_id);
  }

  onResolveParlayClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    //check all open parlays to resolve potential wins
    this.props.resolveParlays(this.props.history);
  }

  onRollbackClick = e => {
    e.preventDefault();

    if (this.state.admin === false) {
      return;
    }

    //rollback all the wagers linked to this match
    this.props.rollbackWagers(this.props.match.params.match_id);
  }

  async componentDidMount() {

    await this.props.updateMatchTeams(this.props.match.params.match_id);

    await this.props.showMatch(this.props.match.params.match_id).then(res => {
      this.setState({ 
        tournament: res.tournament,
        home_team: res.home_team,
        away_team: res.away_team,
        winning_team: res.winning_id,
        gold_difference: res.gold_difference,
        kills: res.kills,
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
    let match_trailer = (match_date.getHours() > 11) ? " PM" : " AM";
    let match_time = match_hour + ":" + match_minute + match_trailer;
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

    if (this.state.admin === false) { 
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
        <div className="section">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="hide-on-med-and-down input-field col s8 offset-s2">
              <select id="winning_team" value={this.state.winning_team} onChange={this.onTeamChange}>
                <option value="" disabled selected>Winning Team</option>
                <option value={this.state.home_team._id}>{this.state.home_team.short_name}</option>
                <option value={this.state.away_team._id}>{this.state.away_team.short_name}</option>
              </select>
              <label>Winning Team</label>
            </div>
            <div className="hide-on-large-only input-field col s8 offset-s2">
              <select className="browser-default" id="winning_team" value={this.state.winning_team} onChange={this.onTeamChange}>
                <option value="" disabled selected>Winning Team</option>
                <option value={this.state.home_team._id}>{this.state.home_team.short_name}</option>
                <option value={this.state.away_team._id}>{this.state.away_team.short_name}</option>
              </select>
            </div>
            <div className="input-field col s8 offset-s2">
              <input
                onChange={this.onChange}
                value={this.state.gold_difference}
                error={errors.gold_difference}
                id="gold_difference"
                type="number"
                className={classnames('', { invalid: errors.gold_difference})}
              />
              <label htmlFor="name">Gold Difference</label>
              <span className="red-text">{errors.gold_difference}</span>
            </div>
            <div className="input-field col s8 offset-s2">
              <input
                onChange={this.onChange}
                value={this.state.kills}
                error={errors.kills}
                id="kills"
                type="number"
                className={classnames('', { invalid: errors.kills})}
              />
              <label htmlFor="name">Kills</label>
              <span className="red-text">{errors.kills}</span>
            </div>
            <div className="section">
              <div className="row">
                <div className="update-record-button-home col s12">
                  <Link onClick={this.onRollbackClick} className="btn btn-flat hoverable nostra-button-unfollow">Rollback</Link>
                </div>
              </div>
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
                  Set Score
                </button>
            </div>
          </form>
          <div className="update-section">
            <div className="row">
              <div className="update-record-button-home col s5 offset-s1">
                <Link onClick={this.onHomeTeamUpdateClick} className="btn btn-flat hoverable nostra-button">Update Home Record</Link>
              </div>
              <div className="update-record-button-away col s5">
                <Link onClick={this.onAwayTeamUpdateClick} className="btn btn-flat hoverable nostra-button">Update Away Record</Link>
              </div>
            </div>
            <div className="row">
              <div className="update-record-button-home col s5 offset-s1">
                <Link onClick={this.onHomeTeamUpdateSpreadClick} className="btn btn-flat hoverable nostra-button">Update Home Spread Record</Link>
              </div>
              <div className="update-record-button-away col s5">
                <Link onClick={this.onAwayTeamUpdateSpreadClick} className="btn btn-flat hoverable nostra-button">Update Away Spread Record</Link>
              </div>
            </div>
          </div>  
          <div className="section">
            <div className="row">
              <div className="update-record-button-home col s12">
                <Link onClick={this.onResolveWagerClick} className="btn btn-flat hoverable nostra-button">Resolve Wagers</Link>
              </div>
            </div>
          </div>  
          <div className="section">
            <div className="row">
              <div className="update-record-button-home col s12">
                <Link onClick={this.onResolveParlayClick} className="btn btn-flat hoverable nostra-button">Resolve Parlays</Link>
              </div>
            </div>
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

AdminSetOdds.propTypes = {
  showMatch: PropTypes.func.isRequired,
  updateMatchTeams: PropTypes.func.isRequired,
  checkAdmin: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired,
  updateRecord: PropTypes.func.isRequired,
  updateSpreadRecord: PropTypes.func.isRequired,
  resolveWagers: PropTypes.func.isRequired,
  rollbackWagers: PropTypes.func.isRequired,
  resolveParlays: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { setResult, updateRecord, updateSpreadRecord, resolveWagers, showMatch, updateMatchTeams, checkAdmin, rollbackWagers, resolveParlays })(withRouter(AdminSetOdds));