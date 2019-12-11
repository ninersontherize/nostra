import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyLeagues, showLeague } from "../../actions/leagueActions";
import { getTopWins, getTopLosses, getLeagueInfo } from "../../actions/wagerActions";
import { showUser, getFollowing } from "../../actions/userActions";
import { showTeam } from "../../actions/teamActions";


class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      wager_wins_search_results: [],
      wager_wins_empty: false,
      wager_losses_search_results: [],
      wager_losses_empty: false,
      league_search_results: [],
      leagues_empty: false,
      follower_results: [],
      username: "",
      status: "",
      earnings: "",
      favorite_team_logo: "",
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

  renderOddType = odd_type => {
    if (odd_type === "spread") {
      return "Spread";
    } else {
      return "Money Line";
    }
  };

  showFavorite = favorite => {
    if (favorite === true) {
      return "Yes";
    } else {
      return "No";
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if(nextProps.location.key !== this.props.location.key) {
      window.location.reload();
    }
  }

  async componentDidMount() {
    await this.props.showUser(this.props.match.params.user_id).then(res => {
      if (res.favorite_team === null || res.favorite_team === undefined) {
        this.setState({
          username: res.username,
          status: res.status,
          favorite_team_logo: "/lcs/lcs_logo.png"
        });
      } else {
        this.props.showTeam(res.favorite_team).then(team_res => {
          this.setState({
            username: res.username,
            status: res.status,
            favorite_team_logo: team_res.logo_large
          });
        });
      }
    });

    await this.props.getFollowing(this.props.match.params.user_id).then(res => {
      console.log(res);
      res.forEach(row => {
        this.props.showUser(row.followee_id).then(user_info => {
          user_info.favorite = row.favorite
          this.setState({
            follower_results: this.state.follower_results.concat(user_info).sort((a, b) => (a.favorite < b.favorite) ? 1 : -1)
          });
        });
      });
    });

    await this.props.getMyLeagues(this.props.match.params.user_id).then(res => {
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

    await this.props.getTopWins(this.props.match.params.user_id).then(res => {
      if (res.length === 0) {
        this.setState({
          wager_wins_empty: true
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
          this.setState({
            wager_wins_search_results: this.state.wager_wins_search_results.concat(row)
          });
        });
      });
    });

    await this.props.getTopLosses(this.props.match.params.user_id).then(res => {
      if (res.length === 0) {
        this.setState({
          wager_losses_empty: true
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
          this.setState({
            wager_losses_search_results: this.state.wager_losses_search_results.concat(row)
          });
        });
      });
    });

  };

  render() {
    var league_table;
    var wager_win_table;
    var wager_loss_table;

    if (this.state.wager_wins_empty === true) {
      wager_win_table = 
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
      wager_win_table = <table className="highlight dash-table-center long-table">
                      <thead className="long-table">
                        <tr>
                          <th>League</th>
                          <th></th>
                          <th className="center-align">Match</th>
                          <th></th>
                          <th className="center-align">Amount</th>
                          <th className="center-align">Pick</th>
                          <th className="center-align">Odds</th>
                          <th className="right-align">Payout</th>
                        </tr>
                      </thead>
                      <tbody className="long-table">
                        {this.state.wager_wins_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                                {row.league_name}
                              </Link>
                            </td>
                            <td className="right-align" component="th" scope="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align" conponent="th" scopt="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <span className="versus-small">vs.</span>
                              </Link>
                            </td>
                            <td className="left-align" component="th" scope="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align">{row.amount}g</td>
                            <td className="center-align">
                              <Link to={`/showMatch/${row.match_id}`}>
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                              </Link>
                            </td>
                            <td className="center-align">
                              <div className="row dash-text-container">
                                <span className="dash-spread-label">{this.renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                            <td className="center-align">{row.payout}g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>;
    }

    if (this.state.wager_losses_empty === true) {
      wager_loss_table = 
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
      wager_loss_table = <table className="highlight dash-table-center long-table">
                      <thead className="long-table">
                        <tr>
                          <th>League</th>
                          <th></th>
                          <th className="center-align">Match</th>
                          <th></th>
                          <th className="center-align">Amount</th>
                          <th className="center-align">Pick</th>
                          <th className="center-align">Odds</th>
                          <th className="right-align">Loss</th>
                        </tr>
                      </thead>
                      <tbody className="long-table">
                        {this.state.wager_losses_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                                {row.league_name}
                              </Link>
                            </td>
                            <td className="right-align" component="th" scope="row">
                              <Link to={`showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align" conponent="th" scopt="row">
                              <Link to={`showMatch/${row.match_id}`} className="dash-link">
                                <span className="versus-small">vs.</span>
                              </Link>
                            </td>
                            <td className="left-align" component="th" scope="row">
                              <Link to={`showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align">{row.amount}g</td>
                            <td className="center-align">
                              <Link to={`showMatch/${row.match_id}`}>
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                              </Link>
                            </td>
                            <td className="center-align">
                              <div className="row dash-text-container">
                                <span className="dash-spread-label">{this.renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                            <td className="dash-info-value-red">-({row.amount})g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>;
    }

    if ((this.state.leagues_empty === true)) {
      league_table =  <div className="section">
                        <div className="row">
                          <span className="flow-text dash-info-text">
                            It appears this user isn't in a league yet, invite them to join one!
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
              <b>User</b> Profile
            </h4>
            <div className="divider"></div>
            <div className="section">
              <div className="row">
                <div className="profile-info-container col s3">
                  <div className="row">
                    <div className="row">
                      <h5 className="username-header">
                        {this.state.username}
                      </h5>
                    </div>
                    <img className="profile-team-img" src={process.env.PUBLIC_URL + this.state.favorite_team_logo} />
                  </div>
                  <div className="row">
                    <span className="user-status">
                      <b>Status:</b> {this.state.status}
                    </span>
                  </div>
                  <div className="row">
                    <span className="user-status">
                      <b>Total Earnings:</b> TBD
                    </span>
                  </div>
                  <div className="divider" />
                  <div className="row">
                    <h4 className="profile-sub-title">
                      Following
                    </h4>
                    <div className="follower-table-container">
                      <table className="striped long-table">
                        <thead className="long-table">
                        </thead>
                        <tbody className="long-table">
                          {this.state.follower_results.map(row => (
                            <tr className="dash-row" key={row._id}>
                              <td className="left-align">
                                <Link className="dash-link" to={`/userProfile/${row._id}`}>
                                  {row.username}
                                </Link>
                              </td>
                              <td className="right-align">
                                {this.showFavorite(row.favorite)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="user-profile-table-container col s9">
                  {league_table}
                  {wager_win_table}
                  {wager_loss_table}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

}

UserProfile.propTypes = {
  getMyLeagues: PropTypes.func.isRequired,
  showLeague: PropTypes.func.isRequired,
  getLeagueInfo: PropTypes.func.isRequired,
  getTopWins: PropTypes.func.isRequired,
  getTopLosses: PropTypes.func.isRequired,
  showUser: PropTypes.func.isRequired,
  showTeam: PropTypes.func.isRequired,
  getFollowing: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyLeagues, showLeague, getTopWins, getTopLosses, getLeagueInfo, showTeam, showUser, getFollowing })(UserProfile);