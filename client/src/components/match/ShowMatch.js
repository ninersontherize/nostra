import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatch } from "../../actions/matchActions";
import classnames from "classnames"

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
        spread: res.spread,
        spread_favorite: res.spread_favorite,
        winning_id: res.winning_id,
        losing_id: res.losing_id,
        match_date: res.match_date
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

    let button;
    let table;

    if ((this.state.match_complete === false)) {
      button = <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
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
              <div class="home-team-container">


                 {/*need to add logo attribute to teams in order for this to load properly for any given team*/}


                <img src={process.env.PUBLIC_URL + "/Cloud9-logo.png"} alt="Home Team logo" width="100" height="100"/>
                <div class="team-info">
                  <span class="team-short-name" title="home-team">{this.state.home_team.short_name}</span> 
                </div>
                <div class="team-record">
                  <span class="record" title="home-team-record">{this.state.home_team.wins}-{this.state.home_team.losses}</span>
                </div>
              </div>
              <div class="away-team-container">
                <img src={process.env.PUBLIC_URL + "/liquid.png"} alt="Away Team logo" width="100" height="100"/>
                <div class="team-info">
                  <span class="team-short-name" title="away-team">{this.state.away_team.short_name}</span>
                </div>
                <div class="team-record">
                  <span class="record" title="away-team-record">{this.state.away_team.wins}-{this.state.away_team.losses}</span>
                </div>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.tournament.name}
                  value={this.state.tournament.name}
                  error={errors.tournament_name}
                  id="tournament.name"
                  type="text"
                  className={classnames('', { invalid: errors.tournament_name })}
                />
                <label htmlFor="name">League Name</label>
                <span className="red-text">{errors.tournament_name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.home_team.name}
                  value={this.state.home_team.name}
                  error={errors.home_team_name}
                  id="home_team.name"
                  type="text"
                  className={classnames('', { invalid: errors.home_team_name })}
                />
                <label htmlFor="name">Home Team</label>
                <span className="red-text">{errors.home_team_name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.away_team.name}
                  value={this.state.away_team.name}
                  error={errors.away_team_name}
                  id="away_team.name"
                  type="text"
                  className={classnames('', { invalid: errors.away_team_name })}
                />
                <label htmlFor="name">Away Team</label>
                <span className="red-text">{errors.away_team_name}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                {button}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch })(withRouter(ShowMatch));