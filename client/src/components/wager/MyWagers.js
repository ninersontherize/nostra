import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyWagers, getLeagueInfo } from "../../actions/wagerActions";

class MyWagers extends Component {
  constructor() {
    super();

    this.state = {
      search_results: [],
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

  async componentDidMount() {
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
          this.setState({
            search_results: this.state.search_results.concat(row)
          });
          console.log(this.state.search_results);
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
            <table className="highlight long-table-wager">
              <thead className="long-table-wager">
                <tr>
                  <th>League Name</th>
                  <th></th>
                  <th className="center-align">Match</th>
                  <th></th>
                  <th className="right-align">Amount</th>
                  <th className="right-align">Team</th>
                  <th className="right-align">Odds</th>
                  <th className="right-align">Win</th>
                </tr>
              </thead>
              <tbody className="long-table-wager">
                {this.state.search_results.map(row => (
                  <tr key={row.league_id}>
                    <td component="th" scope="row">
                      <Link to={`/joinLeague/${row.league_id}`} className="dash-link">
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
                    <td className="right-align">{row.amount}g</td>
                    <td className="right-align"><img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} /></td>
                    <td className="right-align">
                      <div className="row search-info-row-container">
                        <span className="search-info-label">{this.renderOddType(row.wager_type)}</span>
                      </div>
                      <div className="row search-info-row-container"> 
                        <span className={row.odds > 0 ? "search-info-value-green" : "search-info-value-red"}>{this.renderOdds(row.wager_type, row.odds)}</span> 
                      </div>
                    </td>
                    <td className="right-align">{this.renderWin(row.win, row.closed)}</td>
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

MyWagers.propTypes = {
  getMyWagers: PropTypes.func.isRequired,
  getLeagueInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getMyWagers, getLeagueInfo })(MyWagers);