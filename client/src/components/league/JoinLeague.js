import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showLeague, joinLeague, getCurrentPlayers, checkCurrentUserMembership } from "../../actions/leagueActions";
import classnames from "classnames"

class JoinLeague extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      game: "",
      leagues_supported: [],
      private: "",
      current_player_count: "",
      current_players: [],
      max_players: "",
      starting_cash: "",
      private_league: "",
      user_exists: false,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onJoinClick = e => {
    e.preventDefault();

    const joinData = {
      league_id: this.props.match.params.league_id,
      user_id: this.props.auth.user.id
    };

    console.log(joinData);

    this.props.joinLeague(joinData, this.props.history);
  };

  async componentDidMount() {
    const userData = {
      league_id: this.props.match.params.league_id,
      user_id: this.props.auth.user.id
    };

    await this.props.showLeague(this.props.match.params.league_id).then(res => {
      this.setState({ 
        name: res.name,
        game: res.game,
        leagues_supported: res.leagues_supported,
        private: res.private,
        max_players: res.max_players,
        starting_cash: res.starting_cash
      });
    });

    if (this.state.private === true) {
      this.setState({
        private_league: "Yes"
      });
    } else {
      this.setState({
        private_league: "No"
      });
    }

    await this.props.getCurrentPlayers(this.props.match.params.league_id).then(res => {
      this.setState({
        current_players: res,
        current_player_count: res.length
      });
    });

    await this.props.checkCurrentUserMembership(userData).then(res => {
      this.setState({
        user_exists: res
      });
    });
  };

  render() {
    const{ errors } = this.state;

    let button;
    let table;

    if ((this.state.private === false) && (this.state.max_players >= this.state.current_players.length) && (this.state.user_exists === false)) {
      button = <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onJoinClick}
                  className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                    Join League
                </button>;
    }

    if ((this.state.current_players.length > 0)) {
      table = <div className="section">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h5>
                    <span className="sub-title">Leaderboard</span>
                  </h5>
                </div>
                <div className="col s6 offset-s3">
                  <table className="highlight minwidth: 650" aria-label="simple table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th className="right-align">% Change</th>
                        <th className="right-align">Current Gold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.current_players.map(row => (
                        <tr key={row.user_id}>
                          <td component="th" scope="row" align="right">
                              <Link className="dash-link" to={`/userProfile/${row.user_id}`}>{row.username}</Link>
                          </td>
                          <td className={row.bankroll_percent_change < 0 ? "search-info-value-red right-align" : "search-info-value-green right-align"}>{row.bankroll_percent_change}%</td>
                          <td className="right-align">{row.user_bankroll}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              <h4 className="header-text">
                <b>League</b> Information
              </h4>
            </div>
            <div className="section">
              <div className="row">
                {table}
              </div>
            </div>
            <div className="divider"></div>
            <div className="section">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5>
                  <span className="sub-title">Details</span>
                </h5>
              </div>
              <div className="league-info">
                <div className="col s2">
                  <div className="row">
                    <span className="league-info-label">
                      Name:
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-label">
                      Game:
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-label">
                      Tournaments:
                    </span>
                  </div>
                </div>
                <div className="col s4 league-info-value-container">
                  <div className="row">
                    <span className="league-info-value">
                      {this.state.name}
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-value">
                      {this.state.game}
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-value">
                      {this.state.leagues_supported.map(row => (
                        <img src={process.env.PUBLIC_URL + row.tournament_logo} className="dash-tournament-img" />
                      ))}
                    </span>
                  </div>
                </div>
                <div className="col s3 league-label-container">
                  <div className="row">
                    <span className="league-info-label">
                      Players:
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-label">
                      Starting Gold:
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-label">
                      Private:
                    </span>
                  </div>
                </div>
                <div className="col s3 league-info-value-container">
                  <div className="row">
                    <span className="league-info-value">
                      {this.state.current_player_count} / {this.state.max_players}
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-value">
                      {this.state.starting_cash}g
                    </span>
                  </div>
                  <div className="row">
                    <span className="league-info-value">
                      {this.state.private_league}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              {button}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

JoinLeague.propTypes = {
  joinLeague: PropTypes.func.isRequired,
  showLeague: PropTypes.func.isRequired,
  getCurrentPlayers: PropTypes.func.isRequired,
  checkCurrentUserMembership: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { joinLeague, showLeague, getCurrentPlayers, checkCurrentUserMembership })(withRouter(JoinLeague));