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
    await this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      res.forEach(row => {
        this.props.getCurrentPlayers(row.league._id).then(player_res => {
          this.props.showLeague(row.league._id).then(res => {
            res.bankroll = row.user_bankroll;
            res.bankroll_percent_change = row.bankroll_percent_change;
            res.current_player_count = player_res.length;
            this.setState({ 
              search_results: this.state.search_results.concat(res).sort((a, b) => (a.bankroll_percent_change < b.bankroll_percent_change) ? 1 : -1)
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
            <div className="row col s12">
              <h4 className="header-text">
                <b>My</b> Leagues
              </h4>
            </div> 
            <div className="row">
              <div className="col s4 offset-s2">
                <Link to="/searchLeague" className="btn btn-flat waves-light waves-effect hoverable nostra-button">
                  Search for League
                </Link>
              </div>
              <div className="col s4">
                <Link to="/createLeague" className="btn btn-flat waves-light waves-effect hoverable nostra-button">
                  Create League
                </Link>
              </div>
            </div>
            <div className="divider"></div>
            <table className="highlight long-table">
              <thead className="long-table">
                <tr>
                  <th>League Name</th>
                  <th className="center-align">Number of Players</th>
                  <th className="center-align">Game</th>
                  <th className="center-align">Leagues Supported</th>
                  <th className="center-align">Current Bankroll</th>
                  <th className="right-align">Percent Change</th>
                </tr>
              </thead>
              <tbody className="long-table">
                {this.state.search_results.map(row => (
                  <tr key={row._id}>
                    <td component="th" scope="row">
                      <Link to={`/joinLeague/${row._id}`} className="dash-link">
                        {row.name}
                      </Link>
                    </td>
                    <td className="center-align">{row.current_player_count}</td>
                    <td className="center-align">{row.game}</td>
                    <td className="center-align">
                      {row.leagues_supported.map(sub_row => (
                        <span><img className="search-match-tournament-img" src={process.env.PUBLIC_URL + sub_row.tournament_logo} /> </span>
                      ))}
                    </td>
                    <td className="center-align">{row.bankroll}</td>
                    <td className={row.bankroll_percent_change > 0 ? "search-info-value-green right-align" : "search-info-value-red right-align"}>{row.bankroll_percent_change}%</td>
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