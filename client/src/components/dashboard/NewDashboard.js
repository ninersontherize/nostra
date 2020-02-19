import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyLeagues, showLeague } from "../../actions/leagueActions";
import { getMyOpenWagers, getLeagueInfo, deleteWager } from "../../actions/wagerActions";
import { showUser, getFollowing, favoriteUser } from "../../actions/userActions";
import { showTeam } from "../../actions/teamActions";
import { searchMatchByDateRange } from "../../actions/matchActions";


class NewDashboard extends Component {
  constructor() {
    super();

    this.state = {
      wager_search_results: [],
      display_wager_search_results: [],
      wager_empty: false,
      league_search_results: [],
      leagues_empty: false,
      match_search_results: [],
      display_match_search_results: [],
      past_match_search_results: [],
      display_past_match_search_results: [],
      live_match_search_results: [],
      live_match: false,
      follower_results: [],
      username: "",
      status: "",
      earnings: "",
      favorite_team_logo: "",
      lifetime_earnings_cash: "",
      lifetime_earnings_pct: "",
      current_match_filter: "",
      current_wager_filter: "",
      errors: {}
    };
  }

  renderOdds = (odd_type, odd) => {
    if(odd > 0 && odd_type === "spread") {
      return `+${odd/1000} K`;
    } else if (odd < 0 && odd_type === "spread") {
      return `${odd/1000} K`;
    } else if (odd > 0 && odd_type === "money_line") {
      return `+${odd}`;
    } else if (odd < 0 && odd_type === "money_line") {
      return odd;
    } else if (odd_type ==="parlay") {
      return `${parseFloat(odd).toFixed(2)}-1`
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
    } else if (odd_type === "money_line"){
      return "Money Line";
    } else {
      return "Parlay";
    }
  };

  renderMatchTime = datetime => {
    let match_hour = (datetime.getHours() % 12);
    if (match_hour === 0) {
      match_hour = 12;
    }
    let match_minute = (datetime.getMinutes() < 10) ? "0" + datetime.getMinutes() : datetime.getMinutes();
    let match_trailer = (datetime.getHours() > 11) ? " PM PST" : " AM PST";
    return match_hour + ":" + match_minute + match_trailer;
  };

  getOpponent = (id, home_team, home_team_logo, away_team_logo) => {
    if (id === home_team) {
      return away_team_logo;
    } else {
      return home_team_logo;
    }
  };

  onMatchFilterClick = id => {
    if (this.state.current_match_filter === id) {
      this.setState({
        display_match_search_results: this.state.match_search_results,
        current_match_filter: ""
      });
      return;
    }

    var new_search_results = [];
    var new_past_search_results = [];
    
    this.state.match_search_results.filter(obj => {
      if (obj.tournament.name === id || obj.home_team.short_name === id || obj.away_team.short_name === id) {
        new_search_results = new_search_results.concat(obj);
      }
    });

    this.state.past_match_search_results.filter(obj => {
      if (obj.tournament.name === id || obj.home_team.short_name === id || obj.away_team.short_name === id) {
        new_past_search_results = new_past_search_results.concat(obj);
      }
    });

    this.setState({
      display_match_search_results: new_search_results,
      display_past_match_search_results: new_past_search_results,
      current_match_filter: id
    });
  };

  onWagerFilterClick = id => {
    if (this.state.current_wager_filter === id) {
      this.setState({
        display_wager_search_results: this.state.wager_search_results,
        current_wager_filter: ""
      });
      return;
    }

    var new_search_results = [];
    
    this.state.wager_search_results.filter(obj => {
      if (obj.match.home_team.short_name === id || obj.match.away_team.short_name === id) {
        new_search_results = new_search_results.concat(obj);
      }
    });

    this.setState({
      display_wager_search_results: new_search_results,
      current_wager_filter: id
    });
  };

  deleteWagerClick = id => {
    var new_search_results = [];
    console.log(id);
    this.props.deleteWager(id).then(wager_res => {
      this.state.wager_search_results.filter(obj => {
        if (obj._id !== id) {
          new_search_results = new_search_results.concat(obj);
        }
      });

      this.setState({
        wager_search_results: new_search_results,
        display_wager_search_results: new_search_results
      })
    })
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

    var next_week = new Date();
    next_week.setDate(next_week.getDate() + 7);

    const DateRange = {
      start_date: Date.now(),
      end_date: Date.parse(next_week),
      order: 1
    };

    this.props.searchMatchByDateRange(DateRange).then(res => {
      res.forEach(row => {
        if (row.winning_id === null) {
          this.setState({
            match_search_results: this.state.match_search_results.concat(row),
            display_match_search_results: this.state.display_match_search_results.concat(row)
          });
        }
      });
    });

    var one_hour = 60 * 60 * 1000;

    const PastDateRange = {
      start_date: 0,
      end_date: Date.now() - one_hour,
      order: -1
    }

    this.props.searchMatchByDateRange(PastDateRange).then(res => {
      res.forEach(row => {
        if (row.winning_id === row.home_team._id) {
          row.team_logo = row.home_team.logo_small;
        } else {
          row.team_logo = row.away_team.logo_small;
        }
        this.setState({
          past_match_search_results: this.state.past_match_search_results.concat(row),
          display_past_match_search_results: this.state.display_past_match_search_results.concat(row)
        });
        
      });
    });

    const LiveDateRange = {
      start_date: Date.now() - one_hour,
      end_date: Date.now(),
      order: -1
    }

    this.props.searchMatchByDateRange(LiveDateRange).then(res => {
      if (res.length > 0) {
        this.setState({
          live_match: true
        });
      }
      this.setState({
        live_match_search_results: res
      });
    });

    this.props.getMyOpenWagers(this.props.auth.user.id).then(res => {
      if (res.length === 0) {
        this.setState({
          wager_empty: true
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
          } else if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
            row.short_name = row.match.home_team.short_name;
          } else if (row.team_id === row.match.away_team._id) {
            row.team_logo = row.match.away_team.logo_small;
            row.short_name = row.match.away_team.short_name;
          }

          if (row.closed === null || Date.parse(row.match.match_date) > Date.now()) {
            this.setState({
              wager_search_results: this.state.wager_search_results.concat(row),
              display_wager_search_results: this.state.display_wager_search_results.concat(row)
            });
          }
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
            league_search_results: this.state.league_search_results.concat(res),
            lifetime_earnings_cash: lifetime_bankroll - lifetime_starting_cash,
            lifetime_earnings_pct: ((lifetime_bankroll - lifetime_starting_cash)/lifetime_starting_cash*100).toFixed(2),
          });
        });
      });
    });

    this.props.getFollowing(this.props.auth.user.id).then(res => {

      res.forEach(row => {
        this.props.showUser(row.followee_id).then(user_info => {
          user_info.favorite = row.favorite
          user_info.follower_id = row._id
          this.setState({
            follower_results: this.state.follower_results.concat(user_info)
          });
        });
      });
    });

  };

  render() {
    const { user } = this.props.auth;

    var league_table;
    var wager_table;
    var live_match;

    if (this.state.live_match === true) {
      live_match =  
                  <div className="row">
                    <h4 className="dash-sub-title">
                      <Link className="dash-link" to="/searchMatch">
                        <span><b>Live</b> Match Alert</span>
                      </Link>
                    </h4> 
                    <table className="striped">
                      <tbody className="long-table">
                        {this.state.live_match_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="center-align">
                              <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                            </td>
                            <td className="right-align">           
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                            </td>
                            <td className="left-align">
                              <span>({row.home_team.wins}-{row.home_team.losses})</span>
                            </td>
                            <td className="center-align">
                              <Link to={`/showMatch/${row._id}`} className="dash-link">
                                <span className="versus-small">vs.</span>
                              </Link>
                            </td>
                            <td className="right-align">
                              <span>({row.away_team.wins}-{row.away_team.losses})</span>
                            </td>
                            <td className="left-align">  
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                            </td>
                            <td className="left-align">
                              <a href={row.tournament.name === "LCS" ? "https://www.twitch.tv/lcs" : "https://www.twitch.tv/lec"}>Watch Live</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> 
                  </div>
    }

    if (this.state.wager_empty === true) {
      wager_table = 
                    <div className="section">
                      <div className="row">
                        <span className="flow-text dash-info-text">
                          You currently have no open wagers, click on an upcoming match below to place one!
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
                          <th className="center-align"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.display_wager_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                                {row.league_name}
                              </Link>
                            </td>
                            <td className="center-align" component="th" scope="row">
                              <button
                                className="btn-flat"
                                onClick={() => this.onWagerFilterClick(row.short_name)}>            
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                              </button>
                            </td>
                            <td className="center-align">{row.amount}g</td>
                            <td className="right-align" component="th" scope="row">
                              <button
                                className="btn-flat"
                                onClick={() => this.onWagerFilterClick(row.match.home_team.short_name)}>            
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                              </button>
                            </td>
                            <td className="center-align" conponent="th" scopt="row">
                              <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                                <span className="versus-small">vs.</span>
                              </Link>
                            </td>
                            <td className="left-align" component="th" scope="row">
                              <button
                                className="btn-flat"
                                onClick={() => this.onWagerFilterClick(row.match.away_team.short_name)}>            
                                <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                              </button>
                            </td>
                            <td className="center-align">
                              <div className="row dash-text-container">
                                <span className="dash-spread-label">{this.renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                            <td>
                              <button
                                style={{
                                  width: "90px",
                                  borderRadius: "1px",
                                  letterSpacing: "1px",
                                  marginTop: "1rem",
                                  fontSize: "12px"
                                }}
                                onClick={() => this.deleteWagerClick(row._id)}
                                className="btn-flat waves-effect waves-light hoverable nostra-button-unfollow">
                                  Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>;
    }

    if ((this.state.leagues_empty === false)) {
      league_table =  <div className="row">
                        <Link className="dash-link" to='/myLeagues'>
                          <h4 className="profile-sub-title">
                            Leagues
                          </h4>
                        </Link>
                        <table className="striped">
                          <tbody>
                            {this.state.league_search_results.map(row => (
                              <tr className="dash-row" key={row._id}>
                                <td className="dash-league-name right-align" component="th" scope="row">
                                  <Link className="dash-link truncate" to={`/joinLeague/${row._id}`}>
                                    {row.name}
                                  </Link>
                                </td>
                                <td className={row.bankroll_percent_change < 0 ? "dash-info-value-red center-align" : "dash-info-value-green center-align"}>{row.bankroll_percent_change.toFixed(2)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
    } else {
      league_table =  <div className="row">
                          <h4 className="profile-sub-title">
                            Leagues
                          </h4>
                        <div className="row">
                          <Link className="dash-league-link" to="/createLeague">
                            Create New League
                          </Link>
                        </div>
                        <div className="row">
                          <Link className="dash-league-link" to='/searchLeague'>
                            Search Available Leagues
                          </Link>
                        </div>
                      </div>
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <div className="row dash-welcome-text">
              <h4 className="header-text">
                <b>Hey there,</b> {user.name.split(" ")[0]}
              </h4>
            </div>
            <div className="divider"></div>
            <div className="section">
              <div className="row">
                <div className="profile-info-container col s3">
                  <div className="row"> 
                    <img className="profile-team-img" src={process.env.PUBLIC_URL + this.state.favorite_team_logo} />
                    <Link className="btn-flat settings-dash" to={`/userSettings/${this.props.auth.user.id}`}>
                      <i class="material-icons">settings_applications</i> 
                    </Link>               
                    <h5 className="username-header">
                      <Link to={`/userProfile/${this.props.auth.user.id}`} className="dash-link">{this.state.username}</Link>
                    </h5>                    
                  </div>
                  <div className="row">
                    <span className="user-status">
                      <b>Status:</b> {this.state.status}
                    </span>
                  </div>
                  <div className="row">
                    <span className="user-status">
                      <b>Total Earnings:</b> <span className={this.state.lifetime_earnings_cash < 0 ? "dash-info-value-red" : "dash-info-value-green"}>{this.renderOdds("none", this.state.lifetime_earnings_cash)}g <br/>({this.renderOdds("none", this.state.lifetime_earnings_pct)}%)</span>
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
                      <table className={(this.state.follower_results.length < 7) ? "striped" : "striped long-table"}>
                        <thead className="long-table">
                        </thead>
                        <tbody className="long-table">
                          {this.state.follower_results.map(row => (
                            <tr className="dash-row" key={row._id}>
                              <td className="right-align">
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
                  <br/>
                  {live_match}
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
                        <th className="right-align"></th>
                      </tr>
                    </thead>
                    <tbody className="long-table">
                      {this.state.display_match_search_results.map(row => (
                        <tr className="dash-row" key={row._id}>
                          <td>
                            <button
                              className="btn-flat"
                              onClick={() => this.onMatchFilterClick(row.tournament.name)}> 
                              <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                            </button>
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
                            <button
                              className="btn-flat"
                              onClick={() => this.onMatchFilterClick(row.home_team.short_name)}>            
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                            </button>
                          </td>
                          <td className="center-align" conponent="th" scopt="row">
                            <Link to={`/showMatch/${row._id}`} className="dash-link">
                              <span className="versus-small">vs.</span>
                            </Link>
                          </td>
                          <td className="left-align" component="th" scope="row">
                            <button
                              className="btn-flat"
                              onClick={() => this.onMatchFilterClick(row.away_team.short_name)}>   
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                            </button>
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
                          <td className="right-align"><Link to={`/showMatch/${row._id}`}>Match Page</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                  <h4 className="dash-sub-title">
                    <Link className="dash-link" to="/searchMatch">
                      <span><b>Past</b> Matches</span>
                    </Link>
                  </h4>  
                  <table className="highlight dash-table-center long-table" pageSize={(this.state.past_match_search_results.length > 3) ? 3 : this.state.past_match_search_results.length}>
                    <thead className="long-table">
                      <tr>
                        <th>League</th>
                        <th className="left-align">Match Date</th>
                        <th></th>
                        <th className="center-align">Match</th>
                        <th></th>
                        <th className="left-align">Gold Diff</th>
                        <th className="left-align">Winner</th>
                        <th className="right-align"></th>
                      </tr>
                    </thead>
                    <tbody className="long-table">
                      {this.state.display_past_match_search_results.map(row => (
                        <tr className="dash-row" key={row._id}>
                          <td>
                            <button
                              className="btn-flat"
                              onClick={() => this.onMatchFilterClick(row.tournament.name)}> 
                              <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                            </button>
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
                            <button
                              className="btn-flat"
                              onClick={() => this.onMatchFilterClick(row.home_team.short_name)}>            
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                            </button>
                          </td>
                          <td className="center-align" conponent="th" scopt="row">
                            <Link to={`/showMatch/${row._id}`} className="dash-link">
                              <span className="versus-small">vs.</span>
                            </Link>
                          </td>
                          <td className="left-align" component="th" scope="row">
                            <button
                              className="btn-flat"
                              onClick={() => this.onMatchFilterClick(row.away_team.short_name)}>   
                              <img className="search-match-img" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                            </button>
                          </td>
                          <td className="left-align">
                            <span>{row.gold_difference/1000} K</span>
                          </td>
                          <td className="left-align">
                            <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                          </td>
                          <td className="right-align"><Link to={`/showMatch/${row._id}`}>Match Page</Link></td>
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
  getMyOpenWagers: PropTypes.func.isRequired,
  deleteWager: PropTypes.func.isRequired,
  getFollowing: PropTypes.func.isRequired,
  searchMatchByDateRange: PropTypes.func.isRequired,
  favoriteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyLeagues, showLeague, getLeagueInfo, showTeam, showUser, getMyOpenWagers, deleteWager, getFollowing, searchMatchByDateRange, favoriteUser})(withRouter(NewDashboard));