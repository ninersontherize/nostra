import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyLeagues, showLeague } from "../../actions/leagueActions";
import { getMyWagers, getLeagueInfo } from "../../actions/wagerActions";
import { showUser, getFollowing, favoriteUser } from "../../actions/userActions";
import { showTeam } from "../../actions/teamActions";
import { searchMatch } from "../../actions/matchActions";


class NewDashboard extends Component {
  constructor() {
    super();

    this.state = {
      wager_search_results: [],
      wager_empty: false,
      league_search_results: [],
      leagues_empty: false,
      match_search_results: [],
      follower_results: [],
      username: "",
      status: "",
      earnings: "",
      favorite_team_logo: "",
      lifetime_earnings_cash: "",
      lifetime_earnings_pct: "",
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

  onFavoriteClick = id => {
    this.props.favoriteUser(id, this.props.history);
    this.state.follower_results.filter(obj => {
      if (obj.follower_id === id) {
        obj.favorite = !obj.favorite;
      }
    });
  }

  renderOddType = odd_type => {
    if (odd_type === "spread") {
      return "Spread";
    } else {
      return "Money Line";
    }
  };

  renderMatchTime = datetime => {
    let match_hour = (datetime.getHours() % 12);
    let match_minute = (datetime.getMinutes() < 10) ? "0" + datetime.getMinutes() : datetime.getMinutes();
    let match_trailer = (datetime.getHours() > 11) ? " PM" : " AM";
    return match_hour + ":" + match_minute + match_trailer;
  };

  getOpponent = (id, home_team, home_team_logo, away_team_logo) => {
    if (id === home_team) {
      return away_team_logo;
    } else {
      return home_team_logo;
    }
  };

  componentDidMount() {

    this.props.showUser(this.props.auth.user.id).then(res => {
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

    this.props.getFollowing(this.props.auth.user.id).then(res => {
      console.log(res);
      res.forEach(row => {
        this.props.showUser(row.followee_id).then(user_info => {
          user_info.favorite = row.favorite
          user_info.follower_id = row._id
          this.setState({
            follower_results: this.state.follower_results.concat(user_info).sort((a, b) => (a.favorite < b.favorite) ? 1 : -1)
          });
        });
      });
    });

    this.props.getMyLeagues(this.props.auth.user.id).then(res => {
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
            league_search_results: this.state.league_search_results.concat(res).sort((a, b) => (a.bankroll_percent_change < b.bankroll_percent_change) ? 1 : -1),
            lifetime_earnings_cash: lifetime_bankroll - lifetime_starting_cash,
            lifetime_earnings_pct: ((lifetime_bankroll - lifetime_starting_cash)/lifetime_starting_cash*100).toFixed(2),
          });
        });
      });
    });

    this.props.getMyWagers(this.props.auth.user.id).then(res => {
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

    this.props.searchMatch().then(res => {
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
    var follow_button;

    if (this.state.wager_empty === true) {
      wager_table = 
                    <div className="section">
                      <div className="row">
                        <span className="flow-text dash-info-text">
                          This user hasn't won any wagers yet, check back soon.
                        </span>
                      </div>
                    </div>
    } else {      
      wager_table = <table className={(this.state.wager_search_results.length < 5) ? "highlight dash-table-center" : "highlight dash-table-center long-table"}>
                      <thead>
                        <tr>
                          <th>League</th>
                          <th className="center-align">Pick</th>
                          <th className="center-align">Amount</th>
                          <th></th>
                          <th className="center-align">Match</th>
                          <th></th>
                          <th className="center-align">Odds</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.wager_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                                {row.league_name}
                              </Link>
                            </td>
                            <td className="center-align">
                              <Link to={`/showMatch/${row.match_id}`}>
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                              </Link>
                            </td>
                            <td className="center-align">{row.amount}g</td>
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
                                <td className={row.bankroll_percent_change > 0 ? "dash-info-value-green center-align" : "dash-info-value-red center-align"}>{row.bankroll_percent_change}%</td>
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
              <b>Hey there,</b> {user.name.split(" ")[0]}
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
                      <b>Total Earnings:</b> <span className={this.state.lifetime_earnings_cash > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds("none", this.state.lifetime_earnings_cash)}g <br/>({this.renderOdds("none", this.state.lifetime_earnings_pct)}%)</span>
                    </span>
                  </div>
                  <div className="divider" />
                  {league_table}
                  <div className="divider" />
                  <div className="row">
                    <Link className="dash-link" to='/searchUser'>
                      <h4 className="profile-sub-title">
                        Following
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
                                <Link className="dash-link" to={`/userProfile/${row._id}`}>
                                  {row.username}
                                </Link>
                              </td>
                              <td className="center-align">
                              <button
                                className="btn-flat"
                                onClick={() => this.onFavoriteClick(row.follower_id)}>
                                  {(row.favorite === true) ? <i class="material-icons">star</i> : <i class="material-icons">star_border</i>}
                              </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="user-profile-table-container col s9">
                  <h4 className="dash-sub-title">
                    <Link className="dash-link" to="/myWagers">
                      <b>Open</b> Wagers
                    </Link>
                  </h4>
                  {wager_table}
                  <div className="divider"></div>
                  <h4 className="dash-sub-title">
                    <Link className="dash-link" to="/searchMatch">
                      <span><b>Upcoming</b> Matches</span>
                    </Link>
                  </h4>                 
                  <table className="highlight dash-table-center long-table" pageSize={(this.state.match_search_results.length > 3) ? 3 : this.state.match_search_results.length}>
                    <thead className="long-table">
                      <tr>
                        <th>League</th>
                        <th className="left-align">Match Date</th>
                        <th></th>
                        <th className="center-align">Match</th>
                        <th></th>
                        <th className="left-align">Money Line</th>
                        <th className="left-align">Spread</th>
                      </tr>
                    </thead>
                    <tbody className="long-table">
                      {this.state.match_search_results.map(row => (
                        <tr className="dash-row" key={row._id}>
                          <td>
                            <Link to={`/searchMatch?search=${row.tournament.name}`}>   
                              <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                            </Link>
                          </td>
                          <td>
                            <div className="row search-info-row-container">
                              <span className="search-info-datetime">{new Date(row.match_date).toDateString()}</span>
                            </div>
                            <div className="row search-info-row-container">
                              <span className="search-info-datetime">{this.renderMatchTime(new Date(row.match_date))}</span>
                            </div>
                          </td>
                          <td className="right-align" component="th" scope="row">           
                            <Link to={`/searchMatch?search=${row.home_team.short_name}`}> 
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                            </Link>
                          </td>
                          <td className="center-align" component="th" scope="row">
                            <span className="versus-small"> vs. </span>
                          </td>
                          <td className="left-align" component="th" scope="row">
                            <Link to={`/searchMatch?search=${row.away_team.short_name}`}>   
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                            </Link>
                          </td>
                          <td className="left-align">
                            <div className="row search-info-row-container">
                              <span className="search-info-label">{row.home_team.short_name}: </span> 
                              <span className={row.money_line_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds("money_line", row.money_line_home)}</span> 
                            </div>
                            <div className="row search-info-row-container">
                              <span className="search-info-label">{row.away_team.short_name}: </span>
                              <span className={row.money_line_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds("money_line", row.money_line_away)}</span>
                            </div>
                          </td>
                          <td className="left-align">
                            <div className="row search-info-row-container">
                              <span className="search-info-label">{row.home_team.short_name}: </span> 
                              <span className={row.spread_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds("spread", row.spread_home)}</span> 
                            </div>
                            <div className="row search-info-row-container">
                              <span className="search-info-label">{row.away_team.short_name}: </span>
                              <span className={row.spread_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds("spread", row.spread_away)}</span>
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
    )

  }

}

NewDashboard.propTypes = {
  getMyLeagues: PropTypes.func.isRequired,
  showLeague: PropTypes.func.isRequired,
  getLeagueInfo: PropTypes.func.isRequired,
  showUser: PropTypes.func.isRequired,
  showTeam: PropTypes.func.isRequired,
  getMyWagers: PropTypes.func.isRequired,
  getFollowing: PropTypes.func.isRequired,
  searchMatch: PropTypes.func.isRequired,
  favoriteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyLeagues, showLeague, getLeagueInfo, showTeam, showUser, getMyWagers, getFollowing, searchMatch, favoriteUser})(withRouter(NewDashboard));