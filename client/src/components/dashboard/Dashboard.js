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
      league_search_results: [],
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
      res.forEach(row => {
        this.props.showLeague(row.league._id).then(res => {
          res.bankroll = row.user_bankroll;
          res.bankroll_percent_change = row.bankroll_percent_change;
          
          if (this.state.league_search_results.length < 6) {
            this.setState({ 
              league_search_results: this.state.league_search_results.concat(res).sort((a, b) => (a.bankroll_percent_change < b.bankroll_percent_change) ? 1 : -1)
            });
          }
        });
      });
    });

    await this.props.getMyWagers(this.props.auth.user.id).then(res => {
      res.forEach(row => {
        this.props.getLeagueInfo(row.user_league_id).then(user_league => {
          row.league_name = user_league.league.name;
          row.league_id = user_league.league._id;
          if (row.team_id === row.match.home_team._id) {
            row.team_logo = row.match.home_team.logo_small;
          } else {
            row.team_logo = row.match.away_team.logo_small;
          }
          if (row.closed === null && this.state.wager_search_results.length < 6) {
            this.setState({
              wager_search_results: this.state.wager_search_results.concat(row)
            });
          }
        });
      });
    });

    await this.props.searchMatch().then(res => {
      res.forEach(row => {
        if (row.winning_id === null && this.state.match_search_results.length < 6) {
          this.setState({
            match_search_results: this.state.match_search_results.concat(row)
          });
        }
      });
    });
  };

  render() {
    const { user } = this.props.auth;
    return(
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
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
                    <table className="highlight dash-table" pageSize={(this.state.league_search_results.length > 3) ? 3 : this.state.league_search_results.length}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th className="center-align">Tournaments</th>
                          <th className="center-align">Bankroll</th>
                          <th className="right-align">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.league_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row._id}`}>
                                {row.name}
                              </Link>
                            </td>
                            <td className="center-align">
                              {row.leagues_supported.map(sub_row => (
                                <span><img src={process.env.PUBLIC_URL + sub_row.tournament_logo} height="25px" width="25px" /> </span>
                              ))}
                            </td>
                            <td className="center-align">{row.bankroll}</td>
                            <td className={row.bankroll_percent_change > 0 ? "dash-info-value-green right-align" : "dash-info-value-red right-align"}>{row.bankroll_percent_change}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col s4 dash-table-container">
                  <h5>
                    <Link className="dash-link" to="/myWagers">
                      <span className="dash-sub-title">My Wagers</span>
                    </Link>
                  </h5>
                  <div className="col s12">
                    <table className="highlight dash-table-center">
                      <thead>
                        <tr>
                          <th>League</th>
                          <th className="center-align">Team</th>
                          <th className="center-align">Amount</th>
                          <th className="right-align">Odds</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.wager_search_results.map(row => (
                          <tr className="dash-row" key={row.league_id}>
                            <td className="dash-league-name" component="th" scope="row">
                              <Link className="dash-link" to={`/joinLeague/${row.league_id}`}>
                                {row.league_name}
                              </Link>
                            </td>
                            <td className="center-align">
                              <Link to={`showMatch/${row.match_id}`}>
                                <img width="60px" height="25px" src={process.env.PUBLIC_URL + row.team_logo} />
                              </Link>
                            </td>
                            <td className="center-align">${row.amount}</td>
                            <td className="right-align">
                              <div className="row dash-text-container">
                                <span className="dash-info-label">{this.renderOddType(row.wager_type)}</span>
                              </div>
                              <div className="row dash-text-container"> 
                                <span className={row.odds > 0 ? "dash-info-value-green" : "dash-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col s4 dash-table-container">
                  <h5>
                    <Link className="dash-link" to="/searchMatch">
                      <span className="dash-sub-title">Upcoming Matches</span>
                    </Link>
                  </h5>
                  <div className="col s12">
                    <table className="highlight dash-table-center" pageSize={(this.state.match_search_results.length > 3) ? 3 : this.state.match_search_results.length}>
                      <thead>
                        <tr>
                          <th>League</th>
                          <th className="center-align">Match</th>
                          <th className="center-align">Spread</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.match_search_results.map(row => (
                          <tr className="dash-row" key={row._id}>
                            <td className="center-align">
                            <Link to={`/searchMatch?search=${row.tournament.name}`}>   
                              <img width="25px" height="25px" src={process.env.PUBLIC_URL + row.tournament.tournament_logo} />
                            </Link>
                            </td>
                            <td className="center-align" component="th" scope="row">
                              <Link to={`showMatch/${row._id}`}>
                                <span>
                                  <img width="48px" height="20px" src={process.env.PUBLIC_URL + row.home_team.logo_small} />
                                </span>
                                <span className="versus-small">vs.</span>
                                <span>
                                  <img width="48px" height="20px" src={process.env.PUBLIC_URL + row.away_team.logo_small} />
                                </span>
                              </Link>
                            </td>
                            <td className="right-align">
                              <div className="row search-info-row-container">
                                <span className="search-info-label">{row.home_team.short_name}: </span> 
                                <span className={row.spread_home > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds('spread', row.spread_home)}</span> 
                              </div>
                              <div className="row search-info-row-container">
                                <span className="search-info-label">{row.away_team.short_name}: </span>
                                <span className={row.spread_away > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds('spread', row.spread_away)}</span>
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
              <p className="flow-text grey-text text-darken-1">
                Welcome to <b>nostra.gg</b>, we are currently under construction, but check back soon for more features!
              </p>
              <p className="flow-text grey-text text-darken-1">
                  New Here? <Link to="/createLeague"><b>Create</b></Link> your first league.
              </p>
              <p className="flow-text grey-text text-darken-1">
                  Or <Link to="/searchLeague"><b>Search</b></Link> for a league to join.
              </p>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
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
