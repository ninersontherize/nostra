import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatch, updateTeamRecords, updateMatchTeams } from "../../actions/matchActions";
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
        spread_home: res.spread_home,
        spread_away: res.spread_away,
        winning_id: res.winning_id,
        losing_id: res.losing_id,
        match_date: res.match_date
      });
      //this.props.updateTeamRecords(res.home_team._id);
      //this.props.updateTeamRecords(res.away_team._id);
    });


    //TODO: Bugfix - for some reason this is not calling the api correctly, it returns 404 error.


    //await this.props.updateMatchTeams(this.props.match.params.match_id);

    //await this.props.showMatch(this.props.match.params.match_id).then(res => {
    //  this.setState({ 
    //    home_team: res.home_team,
    //    away_team: res.away_team
    //  });
    //});

    if (this.state.winning_id) {
      this.setState({
        match_complete: true
      });
    }

  };

  render() {
    const{ errors } = this.state;

    let button;
    let home_logo = process.env.PUBLIC_URL + this.state.home_team.logo_large;
    let away_logo = process.env.PUBLIC_URL + this.state.away_team.logo_large;

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
              <div class="row">
                <div class="section">
                  <div class="col s4">
                    <div class="section">
                      <img src={home_logo} alt="Home Team logo" width="100" height="100"/>
                      <div class="team-info">
                        <span class="team-short-name" title="home-team">{this.state.home_team.short_name}</span> 
                      </div>
                      <div class="team-record">
                        <span class="record" title="home-team-record">{this.state.home_team.wins}-{this.state.home_team.losses}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col s4">
                    <div class="section">
                      <div class="league-and-date-container">
                        <img height="50px" width="50px" src={process.env.PUBLIC_URL + this.state.tournament.tournament_logo} />
                        <div class="match-date">
                          {new Date(this.state.match_date).toDateString()}
                        </div>
                      </div>
                    </div>
                    <div class="divider"></div>
                    <div class="section">
                      <div class="versus-container">
                        <span class="versus">vs.</span>
                      </div> 
                    </div>
                  </div>
                  <div class="col s4">
                    <div class="section">
                      <img src={away_logo} alt="Away Team logo" width="100" height="100"/>
                      <div class="team-info">
                        <span class="team-short-name" title="away-team">{this.state.away_team.short_name}</span>
                      </div>
                      <div class="team-record">
                        <span class="record" title="away-team-record">{this.state.away_team.wins}-{this.state.away_team.losses}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="row">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5>
                  <b>Current Odds</b>
                </h5>
              </div>
                <div class="odds-container">
                  <div class="col s3">
                    <div class="section">
                      <div class="odds">
                        <div class="money-line">
                          <span class="money-line-odds" title="money-line-odds">{this.state.money_line_home}</span>
                        </div>
                      </div> 
                    </div>                   
                    <div class="section">
                      <div class="odds">
                        <div class="spread">
                          <span class="spread-odds" title="spread-odds">{this.state.spread_home}</span>
                        </div>
                      </div> 
                    </div>
                  </div>
                  <div class="col s3">
                    <div class="section"> 
                      <div class="odds-label">
                        <span class="money-line">Money Line</span>
                      </div>
                    </div>                   
                    <div class="section">
                      <div class="odds-label">
                        <span class="spread">Spread</span>
                      </div>
                    </div> 
                  </div>
                  <div class="col s3">
                    <div class="section">
                      <div class="odds">
                        <div class="money-line">
                          <span class="money-line-odds" title="money-line-odds">{this.state.money_line_away}</span>
                        </div>
                      </div> 
                    </div>
                    <div class="section">
                      <div class="odds">
                        <div class="spread">
                          <span class="spread-odds" title="spread-odds">{this.state.spread_away}</span>
                        </div>
                      </div> 
                    </div>
                  </div>
                </div>
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
  updateMatchTeams: PropTypes.func.isRequired,
  updateTeamRecords: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { showMatch, updateTeamRecords, updateMatchTeams })(withRouter(ShowMatch));