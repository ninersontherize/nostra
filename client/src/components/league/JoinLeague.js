import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showLeague, joinLeague, getCurrentPlayers } from "../../actions/leagueActions";
import classnames from "classnames"

class JoinLeague extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      game: "",
      leagues_supported: [],
      private: false,
      current_players: "",
      max_players: "",
      starting_cash: "",
      in_progress: false,
      season_in_progress: "",
      private_league: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const joinData = {
      league_id: this.props.match.params.league_id,
      user_id: this.props.auth.user.id
    };

    this.props.joinLeague(joinData, this.props.history);
  };

  componentDidMount() {
    this.props.showLeague(this.props.match.params.league_id).then(res => {
      this.setState({ 
        name: res.name,
        game: res.game,
        leagues_supported: res.leagues_supported,
        private: res.private,
        max_players: res.max_players,
        starting_cash: res.starting_cash,
        in_progress: res.in_progress 
      });
    });

    if (this.state.in_progress = true) {
      this.setState({
        season_in_progress: "Yes"
      });
    } else {
      this.setState({
        season_in_progress: "No"
      });
    }

    if (this.state.private = true) {
      this.setState({
        private_league: "Yes"
      });
    } else {
      this.setState({
        private_league: "No"
      });
    }

    this.props.getCurrentPlayers(this.props.match.params.league_id).then(res => {
      this.setState({
        current_players: res
      });
    });
  };

  render() {
    const{ errors } = this.state;

    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (!this.state.private && this.state.max_players >= this.state.current_players) {
      button = <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Join League
                </button>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>League</b> Information
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.name}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames('', { invalid: errors.name })}
                />
                <label htmlFor="name">League Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.game}
                  value={this.state.game}
                  error={errors.game}
                  id="game"
                  type="text"
                  className={classnames('', { invalid: errors.game })}
                />
                <label htmlFor="name">Games Covered</label>
                <span className="red-text">{errors.game}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.leagues_supported}
                  value={this.state.leagues_supported}
                  error={errors.leagues_supported}
                  id="leagues_supported"
                  type="text"
                  className={classnames('', { invalid: errors.leagues_supported })}
                />
                <label htmlFor="name">Leagues Supported</label>
                <span className="red-text">{errors.leagues_supported}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.current_players}
                  value={this.state.current_players}
                  error={errors.current_players}
                  id="current_players"
                  type="number"
                  className={classnames('', { invalid: errors.current_players })}
                />
                <label htmlFor="name">Current Number of Players</label>
                <span className="red-text">{errors.max_players}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.max_players}
                  value={this.state.max_players}
                  error={errors.max_players}
                  id="max_players"
                  type="number"
                  className={classnames('', { invalid: errors.max_players })}
                />
                <label htmlFor="name">Max Number of Players</label>
                <span className="red-text">{errors.max_players}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.starting_cash}
                  value={this.state.starting_cash}
                  error={errors.starting_cash}
                  id="starting_cash"
                  type="number"
                  className={classnames('', { invalid: errors.starting_cash })}
                />
                <label htmlFor="name">Starting Bankroll</label>
                <span className="red-text">{errors.starting_cash}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.private_league}
                  value={this.state.private_league}
                  error={errors.private_league}
                  id="private_league"
                  type="text"
                  className={classnames('', { invalid: errors.private_league })}
                />
                <label htmlFor="name">Private League</label>
                <span className="red-text">{errors.private_league}</span>
              </div>
              <div className="input-field col s12">
                <input
                  readOnly
                  placeholder={this.state.season_in_progress}
                  value={this.state.season_in_progress}
                  error={errors.season_in_progress}
                  id="season_in_progress"
                  type="text"
                  className={classnames('', { invalid: errors.season_in_progress })}
                />
                <label htmlFor="name">Season in Progress</label>
                <span className="red-text">{errors.season_in_progress}</span>
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

JoinLeague.propTypes = {
  joinLeague: PropTypes.func.isRequired,
  showLeague: PropTypes.func.isRequired,
  getCurrentPlayers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { joinLeague, showLeague, getCurrentPlayers })(withRouter(JoinLeague));