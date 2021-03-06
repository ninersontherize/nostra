import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyLeagues, showLeague } from "../../actions/leagueActions";
import { getTopWins, getTopLosses, getLeagueInfo } from "../../actions/wagerActions";
import { showUser, getFollowers, checkFollowed, followUser, unfollowUser } from "../../actions/userActions";
import { renderOdds, renderOddType } from "../../helpers/odds";
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
      is_followed: false,
      lifetime_earnings_cash: "",
      lifetime_earnings_pct: "",
      errors: {}
    };
  }

  onFollowClick = e => {
    e.preventDefault();
    const followData = {
      follower_id: this.props.auth.user.id,
      followee_id: this.props.match.params.user_id
    };
    this.props.followUser(followData, this.props.history);
    this.setState({
      is_followed: true
    });
  }

  onUnfollowClick = e => {
    e.preventDefault();
    const followData = {
      follower_id: this.props.auth.user.id,
      followee_id: this.props.match.params.user_id
    };
    this.props.unfollowUser(followData, this.props.history);
    this.setState({
      is_followed:false
    })
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if(nextProps.location.key !== this.props.location.key) {
      window.location.reload();
    }
  };

  componentDidMount() {

    this.props.checkFollowed(this.props.auth.user.id, this.props.match.params.user_id).then(res => {
      if (res > 0) {
        this.setState({
          is_followed: true
        });
      } else if (this.props.auth.user.id === this.props.match.params.user_id) {
        this.setState({
          is_followed: null
        });
      }
    });

    this.props.showUser(this.props.match.params.user_id).then(res => {
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

    this.props.getFollowers(this.props.match.params.user_id).then(res => {
      console.log(res);
      res.forEach(row => {
        this.props.showUser(row.follower_id).then(user_info => {
          user_info.favorite = row.favorite
          this.setState({
            follower_results: this.state.follower_results.concat(user_info)
          });
        });
      });
    });

    this.props.getMyLeagues(this.props.match.params.user_id).then(res => {
      if (res.length === 0) {
        this.setState({
          leagues_empty: true
        });
      }
      var lifetime_starting_cash = 0;
      var lifetime_bankroll = 0;
      res.forEach(row => {
        this.props.showLeague(row.league._id).then(res => {
          res.bankroll = row.user_bankroll;
          res.bankroll_percent_change = row.bankroll_percent_change;

          lifetime_bankroll = lifetime_bankroll + row.user_bankroll;
          lifetime_starting_cash = lifetime_starting_cash + res.starting_cash;
        
          this.setState({ 
            league_search_results: this.state.league_search_results.concat(res),
            lifetime_earnings_cash: lifetime_bankroll - lifetime_starting_cash,
            lifetime_earnings_pct: ((lifetime_bankroll - lifetime_starting_cash)/lifetime_starting_cash*100).toFixed(2),
          });
        });
      });
    });

    this.props.getTopWins(this.props.match.params.user_id).then(res => {
      if (res.length === 0) {
        this.setState({
          wager_wins_empty: true
        });
      }
      res.forEach(row => {
        this.props.getLeagueInfo(row.user_league_id).then(user_league => {
          row.league_name = user_league.league.name;
          row.league_id = user_league.league._id;
          if (row.match_id === "parlay") {
            row.team_logo = "/lcs/lcs_logo.png";
            row.match.home_team.logo_small = "/lcs/lcs_logo.png";
            row.match.away_team.logo_small = "/lcs/lcs_logo.png";
          } else if (row.wager_type === "over_under") {
            row.short_name = "over_under";
          } else if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
            row.short_name = row.match.home_team.short_name;
          } else if (row.team_id === row.match.away_team._id) {
            row.team_logo = row.match.away_team.logo_small;
            row.short_name = row.match.away_team.short_name;
          }
          this.setState({
            wager_wins_search_results: this.state.wager_wins_search_results.concat(row)
          });
        });
      });
    });

    this.props.getTopLosses(this.props.match.params.user_id).then(res => {
      if (res.length === 0) {
        this.setState({
          wager_losses_empty: true
        });
      }
      res.forEach(row => {
        this.props.getLeagueInfo(row.user_league_id).then(user_league => {
          row.league_name = user_league.league.name;
          row.league_id = user_league.league._id;
          if (row.match_id === "parlay") {
            row.team_logo = "/lcs/lcs_logo.png";
            row.match.home_team.logo_small = "/lcs/lcs_logo.png";
            row.match.away_team.logo_small = "/lcs/lcs_logo.png";
          } else if (row.wager_type === "over_under") {
            row.short_name = "over_under";
          } else if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
            row.short_name = row.match.home_team.short_name;
          } else if (row.team_id === row.match.away_team._id) {
            row.team_logo = row.match.away_team.logo_small;
            row.short_name = row.match.away_team.short_name;
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
    var follow_button;
    const { location, match } = this.props;

    if (this.state.is_followed === false) {
      follow_button =
                    <button
                      style={{
                        width: "200px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      onClick={this.onFollowClick}
                      className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                        Follow User
                    </button>;
    } else if (this.state.is_followed === true) {
      follow_button =
                    <button
                      style={{
                        width: "200px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      onClick={this.onUnfollowClick}
                      className="btn btn-flat waves-effect waves-light hoverable nostra-button-unfollow">
                        Unfollow User
                    </button>;
    }

    if (this.state.wager_wins_empty === true) {
      wager_win_table = 
                    <div className="section">
                      <div className="row">
                        <span className="flow-text dash-info-text">
                          This user hasn't won any wagers yet, check back soon.
                        </span>
                      </div>
                    </div>
    } else {      
      wager_win_table = <table className={(this.state.wager_wins_search_results.length < 7) ? "highlight dash-table-center" : "highlight dash-table-center long-table"}>
                      <thead>
                        <tr>
                          <th>Pick</th>
                          <th className="center-align">Amount</th>
                          <th></th>
                          <th className="center-align">Match</th>
                          <th></th>
                          <th className="center-align">Odds</th>
                          <th className="right-align">Payout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.wager_wins_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="left-align">
                              <Link to={`/showMatch/${row.match_id}`}>
                                {row.wager_type === "over_under" ? <button className="btn-flat"><span>{row.team_id}</span></button> : <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />}
                              </Link>
                            </td>
                            <td className="center-align">{row.amount}g</td>
                            <td className="right-align" component="th" scope="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align" conponent="th" scopt="row">
                              <Link to={(row.match_id === "parlay") ? `/viewParlay/${row._id}` : `/showMatch/${row.match_id}`} className="dash-link">
                                <span className="versus-small">vs.</span>
                              </Link>
                            </td>
                            <td className="left-align" component="th" scope="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align">
                              <div className="row dash-text-container">
                                <span className="dash-spread-label">{renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                            <td className="right-align dash-info-value-green">{(row.payout-row.amount)}g</td>
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
                          This user hasn't lost any wagers yet, ask them for a tip!
                        </span>
                      </div>
                    </div>
    } else {      
      wager_loss_table = <table className={(this.state.wager_losses_search_results.length < 5) ? "highlight dash-table-center" : "highlight dash-table-center long-table"}>
                      <thead>
                        <tr>
                          <th>Pick</th>
                          <th className="center-align">Amount</th>
                          <th></th>
                          <th className="center-align">Match</th>
                          <th></th>
                          <th className="center-align">Odds</th>
                          <th className="right-align">Loss</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.wager_losses_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="left-align">
                              <Link to={`/showMatch/${row.match_id}`}>
                                {row.wager_type === "over_under" ? <span>{row.team_id}</span> : <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />}
                              </Link>
                            </td>
                            <td className="center-align">{row.amount}g</td>
                            <td className="right-align" component="th" scope="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align" conponent="th" scopt="row">
                              <Link to={(row.match_id === "parlay") ? `/viewParlay/${row._id}` : `/showMatch/${row.match_id}`} className="dash-link">
                                <span className="versus-small">vs.</span>
                              </Link>
                            </td>
                            <td className="left-align" component="th" scope="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                              </Link>
                            </td>
                            <td className="center-align">
                              <div className="row dash-text-container">
                                <span className="dash-spread-label">{renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                            <td className="right-align dash-info-value-red">-({row.amount})g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>;
    }

    if ((this.state.leagues_empty === false)) {
      league_table =  <div className="row">
                        <Link className="dash-link" to='/searchLeague'>
                          <h4 className="profile-sub-title">
                            Leagues
                          </h4>
                        </Link>
                        <table className="striped">
                          <tbody>
                            {this.state.league_search_results.map(row => (
                              <tr className="dash-row" key={row._id}>
                                <td className="dash-league-name" component="th" scope="row">
                                  <Link className="dash-link" to={`/joinLeague/${row._id}`}>
                                    {row.name}
                                  </Link>
                                </td>
                                <td className={row.bankroll_percent_change > 0 ? "dash-info-value-green center-align" : "dash-info-value-red center-align"}>{row.bankroll_percent_change.toFixed(2)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                    <img className="profile-team-img" src={process.env.PUBLIC_URL + this.state.favorite_team_logo} />                 
                    <h5 className="username-header">
                      {this.state.username}
                    </h5>                    
                  </div>
                  <div className="row">
                    <span className="user-status">
                      <b>Status:</b> {this.state.status}
                    </span>
                  </div>
                  <div className="row">
                    <span className="user-status">
                      <b>Total Earnings:</b> <span className={this.state.lifetime_earnings_cash > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{renderOdds("none", this.state.lifetime_earnings_cash)}g <br/>({renderOdds("none", this.state.lifetime_earnings_pct)}%)</span>
                    </span>
                  </div>
                  <div className="row">
                    {follow_button}
                  </div>
                  <div className="divider" />
                  {league_table}
                  <div className="divider" />
                  <div className="row">
                    <Link className="dash-link" to='/searchUser'>
                      <h4 className="profile-sub-title">
                        Followers
                      </h4>
                    </Link>
                    <div className="follower-table-container">
                      <table className="striped long-table">
                        <thead className="long-table">
                        </thead>
                        <tbody className="long-table">
                          {this.state.follower_results.map(row => (
                            <tr className="dash-row" key={row._id}>
                              <td className="left-align">
                                <Link className="dash-link" to={location.pathname.replace(match.params.user_id, row._id)}>
                                  {row.username}
                                </Link>
                              </td>
                              <td className="center-align">
                                {(row.favorite === true) ? <i class="material-icons">star</i> : <i class="material-icons">star_border</i>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="user-profile-table-container col s9">
                  <h4 className="profile-sub-title">
                    Biggest Wins
                  </h4>
                  {wager_win_table}
                  <br/>
                  <h4 className="profile-sub-title">
                    Biggest Losses
                  </h4>                 
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
  checkFollowed: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyLeagues, showLeague, getTopWins, getTopLosses, getLeagueInfo, showTeam, showUser, getFollowers, checkFollowed, followUser, unfollowUser })(withRouter(UserProfile));