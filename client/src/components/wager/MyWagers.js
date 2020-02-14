import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyOpenWagers, getMyClosedWagers, getLeagueInfo } from "../../actions/wagerActions";

class MyWagers extends Component {
  constructor() {
    super();

    this.state = {
      open_search_results: [],
      open_display_search_results: [],
      closed_search_results: [],
      closed_display_search_results: [],
      open_current_filter: "",
      open_current_tournament_filter: "",
      closed_current_filter: "",
      closed_current_tournament_filter: "",
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

  renderOddType = odd_type => {
    if (odd_type === "spread") {
      return "Spread";
    } else if (odd_type === "money_line"){
      return "Money Line";
    } else {
      return "Parlay";
    }
  };

  onFilterClick = (id, status) => {
    if (status === "open") {
      if (this.state.open_current_filter === id) {
        this.setState({
          open_display_search_results: this.state.open_search_results,
          open_current_tournament_filter: "",
          open_current_filter: ""
        });
        return;
      }
    } else {
      if (this.state.closed_current_filter === id) {
        this.setState({
          closed_display_search_results: this.state.closed_search_results,
          closed_current_tournament_filter: "",
          closed_current_filter: ""
        });
        return;
      }
    }

    var new_search_results = [];

    
    if (status === "open") {
      if (this.state.open_current_tournament_filter ===  "") {
        this.state.open_search_results.filter(obj => {
          if (obj.match.home_team.short_name === id || obj.match.away_team.short_name === id) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      } else {
        this.state.open_search_results.filter(obj => {
          if ((obj.match.home_team.short_name === id || obj.match.away_team.short_name === id) && obj.league_name === this.state.open_current_tournament_filter) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      }
    } else {
      if (this.state.closed_current_tournament_filter === "") {
        this.state.closed_search_results.filter(obj => {
          if (obj.match.home_team.short_name === id || obj.match.away_team.short_name === id) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      } else {
        this.state.closed_search_results.filter(obj => {
          if ((obj.match.home_team.short_name === id || obj.match.away_team.short_name === id) && obj.league_name === this.state.closed_current_tournament_filter) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      }
    }

    if (status === "open") {
      this.setState({
        open_display_search_results: new_search_results,
        open_current_filter: id
      });
    } else {
      this.setState({
        closed_display_search_results: new_search_results,
        closed_current_filter: id
      });
    }
    
  };

  onTournamentFilterClick = (id, status) => {
    if (status === "open") {
      if (this.state.open_current_tournament_filter === id) {
        this.setState({
          open_display_search_results: this.state.open_search_results,
          open_current_tournament_filter: "",
          open_current_filter: ""
        });
        return;
      }
    } else {
      if (this.state.closed_current_tournament_filter === id) {
        this.setState({
          closed_display_search_results: this.state.closed_search_results,
          closed_current_tournament_filter: "",
          closed_current_filter: ""
        });
        return;
      }
    }

    var new_search_results = [];

    if (status === "open") {
      if (this.state.open_current_filter ===  "") {
        this.state.open_search_results.filter(obj => {
          if (obj.league_name === id) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      } else {
        this.state.open_search_results.filter(obj => {
          if ((obj.match.home_team.short_name === this.state.open_current_filter || obj.match.away_team.short_name === this.state.open_current_filter) && obj.league_name === id) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      }
    } else {
      if (this.state.closed_current_filter ===  "") {
        this.state.closed_search_results.filter(obj => {
          if (obj.league_name === id) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      } else {
        this.state.closed_search_results.filter(obj => {
          if ((obj.match.home_team.short_name === this.state.closed_current_filter || obj.match.away_team.short_name === this.state.closed_current_filter) && obj.league_name === id) {
            new_search_results = new_search_results.concat(obj);
          }
        });
      }
    }
    

    if (status === "open") {
      this.setState({
        open_display_search_results: new_search_results,
        open_current_tournament_filter: id
      });
    } else {
      this.setState({
        closed_display_search_results: new_search_results,
        closed_current_tournament_filter: id
      });
    }
  };

  async componentDidMount() {
    await this.props.getMyOpenWagers(this.props.auth.user.id).then(res => {
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

          this.setState({
            open_search_results: this.state.open_search_results.concat(row),
            open_display_search_results: this.state.open_display_search_results.concat(row)
          });
        });
      });
    });

    await this.props.getMyClosedWagers(this.props.auth.user.id).then(res => {
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
          this.setState({
            closed_search_results: this.state.closed_search_results.concat(row),
            closed_display_search_results: this.state.closed_display_search_results.concat(row)
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
          <div className="col s10 offset-s1">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>My</b> Wagers
              </h4>
            </div>
            <div className="row">
              <div className="my-wagers-sub-header">
                <b>Open</b> Wagers
              </div>
              <table className={(this.state.open_display_search_results.length < 7) ? "highlight" : "hightlight long-table"}>
                <thead className="long-table-wager">
                  <tr>
                    <th>League</th>
                    <th></th>
                    <th className="center-align">Match</th>
                    <th></th>
                    <th className="center-align">Amount</th>
                    <th className="center-align">Pick</th>
                    <th className="center-align">Odds</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="long-table-wager">
                  {this.state.open_display_search_results.map(row => (
                    <tr key={row._id}>
                      <td component="th" scope="row" className="truncate">
                        <button
                          style={{
                            width: "100px",
                            fontSize: "10px"
                          }}
                          className="btn-flat truncate"
                          onClick={() => this.onTournamentFilterClick(row.league_name, "open")}>            
                          {row.league_name}
                        </button>
                      </td>
                      <td className="right-align" component="th" scope="row">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.match.home_team.short_name, "open")}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                        </button>
                      </td>
                      <td className="center-align" conponent="th" scopt="row">
                        <Link to={`showMatch/${row.match_id}`} className="dash-link">
                          <span className="versus-small">vs.</span>
                        </Link>
                      </td>
                      <td className="left-align" component="th" scope="row">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.match.away_team.short_name, "open")}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                        </button>
                      </td>
                      <td className="center-align">{row.amount}g</td>
                      <td className="center-align">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.short_name, "open")}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                        </button>
                      </td>
                      <td className="center-align">
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{this.renderOddType(row.wager_type)}</span>
                        </div>
                        <div className="row search-info-row-container"> 
                          <span className={row.odds > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                        </div>
                      </td>
                      <td className="right-align"><Link to={`/showMatch/${row.match._id}`}>Match Page</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="my-wagers-sub-header">
                <b>Closed</b> Wagers
              </div>
              <table className="highlight long-table-wager">
                <thead className="long-table-wager">
                  <tr>
                    <th>League</th>
                    <th></th>
                    <th className="center-align">Match</th>
                    <th></th>
                    <th className="center-align">Amount</th>
                    <th className="center-align">Pick</th>
                    <th className="center-align">Odds</th>
                    <th className="center-align">Payout</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="long-table-wager">
                  {this.state.closed_display_search_results.map(row => (
                    <tr key={row._id} className={(row.win === true) ? "wager-win-row" : "wager-lose-row"}>
                      <td component="th" scope="row" className="truncate">
                        <button
                          style={{
                            width: "100px",
                            fontSize: "10px"
                          }}
                          className="btn-flat truncate"
                          onClick={() => this.onTournamentFilterClick(row.league_name)}>            
                          {row.league_name}
                        </button>
                      </td>
                      <td className="right-align" component="th" scope="row">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.match.home_team.short_name)}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                        </button>
                      </td>
                      <td className="center-align" conponent="th" scopt="row">
                        <Link to={`showMatch/${row.match_id}`} className="dash-link">
                          <span className="versus-small">vs.</span>
                        </Link>
                      </td>
                      <td className="left-align" component="th" scope="row">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.match.away_team.short_name)}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                        </button>
                      </td>
                      <td className="center-align">{row.amount}g</td>
                      <td className="center-align">
                        <button
                          className="btn-flat"
                          onClick={() => this.onFilterClick(row.short_name)}>            
                          <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                        </button>
                      </td>
                      <td className="center-align">
                        <div className="row search-info-row-container">
                          <span className="search-info-label">{this.renderOddType(row.wager_type)}</span>
                        </div>
                        <div className="row search-info-row-container"> 
                          <span className={row.odds > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                        </div>
                      </td>
                      <td className="center-align">{parseInt(row.payout)}</td>
                      <td className="right-align"><Link to={`/showMatch/${row.match._id}`}>Match Page</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyWagers.propTypes = {
  getMyOpenWagers: PropTypes.func.isRequired,
  getMyClosedWagers: PropTypes.func.isRequired,
  getLeagueInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyOpenWagers, getMyClosedWagers, getLeagueInfo })(MyWagers);