import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyLeagues, showLeague, getCurrentPlayers } from "../../actions/leagueActions";


const isEmpty = require("is-empty");

class MyLeagues extends Component {
  constructor() {
    super();

    this.state = {
      search_results: [],
      errors: {}
    };
  }

  async componentDidMount() {
    var current_bankroll;
    var current_player_count;
    await this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      res.forEach(row => {
        this.props.getCurrentPlayers(row.league._id).then(player_res => {
          this.props.showLeague(row.league._id).then(res => {
            res.bankroll = row.user_bankroll;
            res.current_player_count = player_res.length;
            this.setState({ 
              search_results: this.state.search_results.concat(res)
            });
          });
        });
      });
    });
  };

  render() {
    const{ errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>My</b> Leagues
              </h4>
            </div>
            <table className="highlight minwidth: 650" aria-label="simple table">
              <thead>
                <tr>
                  <th>League Name</th>
                  <th align="right">Number of Players</th>
                  <th align="right">Game</th>
                  <th align="right">Leagues Supported</th>
                  <th align="right">Current Bankroll</th>
                </tr>
              </thead>
              <tbody>
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td component="th" scope="row">
                      <Link to={`/joinLeague/${row._id}`}>
                        {row.name}
                      </Link>
                    </td>
                    <td align="right">{row.current_player_count}</td>
                    <td align="right">{row.game}</td>
                    <td align="right">
                      {row.leagues_supported.map(sub_row => (
                        <img src={process.env.PUBLIC_URL + sub_row.tournament_logo} height="25px" width="25px" />
                      ))}
                    </td>
                    <td align="right">{row.bankroll}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

MyLeagues.propTypes = {
  getMyLeagues: PropTypes.func.isRequired,
  showLeague: PropTypes.func.isRequired,
  getCurrentPlayers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyLeagues, showLeague, getCurrentPlayers })(MyLeagues);