import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatch } from "../../actions/matchActions";
import { getMyLeagues } from "../../actions/leagueActions";
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
      spread: "",
      spread_favorite: "",
      winning_id: "",
      losing_id: "",
      match_date: "",
      my_leauges: [],
      match_complete: false,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  async componentDidMount() {

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
        match_date: res.match_date
      });
    });

    await this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      this.setState({
        my_leauges: res
      });
      console.log(this.state.my_leauges);
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

    let button;
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

    if ((this.state.match_complete === false)) {
      button = <button
                  style={{
                    width: "200px",
                    borderRadius: "1px",
                    letterSpacing: "1px",
                    marginTop: "20%"
                  }}
                  type="submit"
                  className="btn waves-effect waves-light hoverable blue accent-3">
                    Place Wager
                </button>;
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
            <form noValidate onSubmit={() => this.props.history.pushState("/")}>
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
              <div className="row">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5>
                  <b>Current Odds</b>
                </h5>
              </div>
                <div className="odds-container">
                  <div className="col s3">
                    <div className="section">
                      <div className="odds">
                        <div className="money-line">
                          <span className="money-line-odds" title="money-line-odds">{this.state.money_line_home}</span>
                        </div>
                      </div> 
                    </div>                   
                    <div className="section">
                      <div className="odds">
                        <div className="spread">
                          <span className="spread-odds" title="spread-odds">{this.state.spread_home}</span>
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
                        <span className="spread">Spread</span>
                      </div>
                    </div> 
                  </div>
                  <div className="col s3">
                    <div className="section">
                      <div className="odds">
                        <div className="money-line">
                          <span className="money-line-odds" title="money-line-odds">{this.state.money_line_away}</span>
                        </div>
                      </div> 
                    </div>
                    <div className="section">
                      <div className="odds">
                        <div className="spread">
                          <span className="spread-odds" title="spread-odds">{this.state.spread_away}</span>
                        </div>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="section">
                <div className="row">
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h5>
                      <b>Place a wager</b>
                    </h5>
                  </div>
                  <div className="input-field col s3">
                    <select>
                      <optgroup label="Money-Line">
                        <option value={this.state.home_team.short_name + "/MoneyLine"}>{this.state.home_team.short_name}</option>
                        <option value={this.state.away_team.short_name + "/MoneyLine"}>{this.state.away_team.short_name}</option>
                      </optgroup>
                      <optgroup label="Spread">
                        <option value={this.state.home_team.short_name + "/Spread"}>{this.state.home_team.short_name}</option>
                        <option value={this.state.home_team.short_name + "/Spread"}>{this.state.away_team.short_name}</option>
                      </optgroup>
                    </select>
                    <label>Team and Type of Wager</label>
                  </div>
                  <div className="input-field col s3">
                    <select>
                      {this.state.my_leauges.map(row => (
                        <option value={row._id}>{row.league.name}</option>
                      ))}
                    </select> 
                    <label>League</label>
                  </div>
                  <div className="input-field inline col s3">
                    <input
                      onChange={this.onChange}
                      value={this.state.amount}
                      error={errors.amount}
                      id="amount"
                      type="number"
                      className={classnames('', { invalid: errors.amount })}
                    />
                    <label htmlFor="amount">Amount</label>
                    <span className="red-text">{errors.amount}</span>
                  </div>
                  <div className="col s3" style={{ paddingLeft: "30px" }}>
                    {button}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ShowMatch.propTypes = {
  showMatch: PropTypes.func.isRequired,
  getMyLeagues: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch, getMyLeagues })(withRouter(ShowMatch));