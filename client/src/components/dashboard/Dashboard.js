import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getMyLeagues, showLeague } from "../../actions/leagueActions";
import { getMyWagers, getLeagueInfo } from "../../actions/wagerActions";
import { searchMatch } from "../../actions/matchActions";


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      wager_search_results: [],
      wagers_empty: false,
      league_search_results: [],
      leagues_empty: false,
      match_search_results: [],
      leader_search_results: [],
      errors: {}
    };
  }

  renderOdds = (odd_type, odd) => {
    if(odd > 0 && odd_type === "spread") {
      return `+${odd/1000} K`;
    } else if (odd < 0 && odd_type === "spread") {
      return `${odd/1000} K`;
    } else if (odd > 0) {
      return `+${odd}`;
    } else {
      return odd;
    }
  };

  renderOddType = (odd_type) => {
    if (odd_type === "spread") {
      return "Spread";
    } else {
      return "Money Line";
    }
  };

  renderWin = (win, complete) => {
    if (complete === null) {
      return "Open"
    } else {
      if(win === true) {
        return "Yes"
      } else {
        return "No"
      }
    }
  };


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  async componentDidMount() {
    await this.props.getMyLeagues(this.props.auth.user.id).then(res => {
      if (res.length === 0) {
        this.setState({
          leagues_empty: true
        });
      }
      res.forEach(row => {
        this.props.showLeague(row.league._id).then(res => {
          res.bankroll = row.user_bankroll;
          res.bankroll_percent_change = row.bankroll_percent_change;
        
          this.setState({ 
            league_search_results: this.state.league_search_results.concat(res).sort((a, b) => (a.bankroll_percent_change < b.bankroll_percent_change) ? 1 : -1)
          });
        });
      });
    });

    await this.props.getMyWagers(this.props.auth.user.id).then(res => {
      if (res.length === 0) {
        this.setState({
          wagers_empty: true
        });
      }
      res.forEach(row => {
        this.props.getLeagueInfo(row.user_league_id).then(user_league => {
          row.league_name = user_league.league.name;
          row.league_id = user_league.league._id;
          if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
          } else {
            row.team_logo = row.match.away_team.logo_small;
          }
          if (row.closed === null) {
            this.setState({
              wager_search_results: this.state.wager_search_results.concat(row)
            });
          }
        });
      });
    });

    await this.props.searchMatch().then(res => {
      res.forEach(row => {
        if (row.winning_id === null) {
          this.setState({
            match_search_results: this.state.match_search_results.concat(row)
          });
        }
      });
    });
  };

  render() {
    const { user } = this.props.auth;

    var league_table;
    var wager_table;

    if (this.state.wagers_empty === true) {
      wager_table = 
                    <div className="section">
                      <div className="row">
                        <span className="flow-text dash-info-text">
                          It appears you don't have any wagers, place one on your favorite team!
                        </span>
                      </div>
                      <div className="row">
                        <Link to="/searchMatch" className="btn btn-flat waves-light waves-effect hoverable nostra-button">
                          Search Matches
                        </Link>
                      </div>
                    </div>
    } else {      
      wager_table = <table className="highlight dash-table-center long-table">
                      <thead className="long-table">
                        <tr>
                          <th>League</th>
                          <th className="center-align">Team</th>
                          <th className="center-align">Amount</th>
                          <th className="right-align">Odds</th>
                        </tr>
                      </thead>
                      <tbody className="long-table">
                        {this.state.wager_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                                {row.league_name}
                              </Link>
                            </td>
                            <td className="center-align">
                              <Link to={`showMatch/${row.match_id}`}>
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                              </Link>
                            </td>
                            <td className="center-align">{row.amount}g</td>
                            <td className="center-align">
                              <div className="row dash-text-container">
                                <span className="dash-spread-label">{this.renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>;
    }

    if ((this.state.leagues_empty === true)) {
      league_table =  <div className="section">
                        <div className="row">
                          <span className="flow-text dash-info-text">
                            It appears you aren't in a league yet, use the options below to join one or create your own!
                          </span>
                        </div>
                        <div className="row">
                          <Link to="/searchLeague" className="btn btn-flat waves-light waves-effect hoverable nostra-button">
                            Search Leagues
                          </Link>
                        </div>
                        <div className="row">
                          <Link to="/createLeague" className="btn btn-flat waves-light waves-effect hoverable nostra-button">
                            Create New League
                          </Link>
                        </div>
                      </div>
    } else {
      league_table =  <table className="highlight dash-table long-table" pageSize={(this.state.league_search_results.length > 3) ? 3 : this.state.league_search_results.length}>
                        <thead className="long-table">
                          <tr>
                            <th>Name</th>
                            <th className="center-align">Leagues</th>
                            <th className="right-align">Gold</th>
                            <th className="right-align">%</th>
                          </tr>
                        </thead>
                        <tbody className="long-table">
                          {this.state.league_search_results.map(row => (
                            <tr className="dash-row" key={row._id}>
                              <td className="dash-league-name" component="th" scope="row">
                                <Link className="dash-link" to={`/joinLeague/${row._id}`}>
                                  {row.name}
                                </Link>
                              </td>
                              <td className="center-align">
                                {row.leagues_supported.map(sub_row => (
                                  <img className="dash-tournament-img" src={process.env.PUBLIC_URL + sub_row.tournament_logo} />
                                ))}
                              </td>
                              <td className="right-align">{row.bankroll}g</td>
                              <td className={row.bankroll_percent_change > 0 ? "dash-info-value-green right-align" : "dash-info-value-red right-align"}>{row.bankroll_percent_change}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h4 className="header-text">
              <b>Hey there,</b> {user.name.split(" ")[0]}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              <span className="dash-text-container">
                This is your dashboard, a glance at the things that matter most.
              <br />
                For more details, click on the titles.
              </span>
            </p>
            <p className="flow-text grey-text text-darken-1">
       
            </p>
            <div className="divider" />
            <div className="section">
              <div className="row">
                <div className="col s4">
                  <h5>
                    <Link className="dash-link" to="/myLeagues">
                      <span className="dash-sub-title">My Leagues</span>
                    </Link>
                  </h5>
                  <div className="col s12 my-leagues-dash">
                    {league_table}
                  </div>
                </div>
                <div className="col s4 dash-table-container">
                  <h5>
                    <Link className="dash-link" to="/myWagers">
                      <span className="dash-sub-title">My Wagers</span>
                    </Link>
                  </h5>
                  <div className="col s12">
                    {wager_table}
                  </div>
                </div>
                <div className="col s4 dash-table-container">
                  <h5>
                    <Link className="dash-link" to="/searchMatch">
                      <span className="dash-sub-title">Upcoming Matches</span>
                    </Link>
                  </h5>
                  <div className="col s12">
                    <table className="highlight dash-table-center long-table" pageSize={(this.state.match_search_results.length > 3) ? 3 : this.state.match_search_results.length}>
                      <thead className="long-table">
                        <tr>
                          <th className="left-align">League</th>
                          <th></th>
                          <th className="center-align">Match</th>
                          <th></th>
                          <th className="center-align">Spread</th>
                        </tr>
                      </thead>
                      <tbody className="long-table">
                        {this.state.match_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="center-align">
                              <Link to={`/searchMatch?search=${row.tournament.name}`}>   
                                <img className="dash-match-tournament-img" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                              </Link>
                            </td>
                            <td className="right-align" component="th" scope="row">
                              <Link to={`showMatch/${row._id}`}>
                                  <img className="dash-match-img" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align" component="th" scope="row">
                              <Link className="dash-link" to={`showMatch/${row._id}`}>
                                <span className="versus-dash">vs.</span>
                              </Link>
                            </td>
                            <td className="left-align" component="th" scope="row">
                              <Link to={`showMatch/${row._id}`}>
                                <img className="dash-match-img" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                              </Link>
                            </td>
                            <td className="left-align">
                              <div className="row search-info-row-container">
                                <span className="dash-spread-label">{row.home_team.short_name}: </span> 
                                <span className={row.spread_home > 0 ? "dash-spread-value-green" : "dash-spread-value-red"}>{this.renderOdds('spread', row.spread_home)}</span> 
                              </div>
                              <div className="row search-info-row-container">
                                <span className="dash-spread-label">{row.away_team.short_name}: </span>
                                <span className={row.spread_away > 0 ? "dash-spread-value-green" : "dash-spread-value-red"}>{this.renderOdds('spread', row.spread_away)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getMyLeagues: PropTypes.func.isRequired,
  showLeague: PropTypes.func.isRequired,
  getMyWagers: PropTypes.func.isRequired,
  getLeagueInfo: PropTypes.func.isRequired,
  searchMatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, getMyLeagues, showLeague, getMyWagers, getLeagueInfo, searchMatch })(Dashboard);
