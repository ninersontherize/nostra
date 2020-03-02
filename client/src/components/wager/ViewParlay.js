import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames"
import { showParlay, showWager } from "../../actions/wagerActions";
import { renderMatchTime, renderMatchDate, renderOdds } from "../../helpers/odds";

const isEmpty = require("is-empty");

class ViewParlay extends Component {
  constructor() {
    super();

    this.state = {
      parlay_wager: "",
      parlay_sub_wagers: [],
      errors: {}
    };
  }
 
  async componentDidMount() {
    await this.props.showWager(this.props.match.params.parlay_id).then(res => {
      this.setState({
        parlay_wager: res
      });
    });

    await this.props.showParlay(this.props.match.params.parlay_id).then(res => {
      res.forEach(row => {
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
          parlay_sub_wagers: this.state.parlay_sub_wagers.concat(row)
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
            <h4 className="header-text">
              <b>View</b> Parlay
            </h4>
            <div className="row parlay-header-row">
              <div className="col s6">
                <span className="parlay-sub-labels"><b>Parlay Amount:</b> {this.state.parlay_wager.amount}</span>
              </div>
              <div className="col s6">
                <span className="parlay-sub-labels"><b>Parlay Odds:</b> {renderOdds(this.state.parlay_wager.wager_type, this.state.parlay_wager.odds)}</span>
              </div>
            </div>
            <table className="highlight">
              <thead>
                <tr>
                  <th>League</th>
                  <th className="center-align">Match Date</th>
                  <th></th>
                  <th className="center-align">Match</th>
                  <th></th>
                  <th className="center-align">Pick</th>
                </tr>
              </thead>
              <tbody>
                {this.state.parlay_sub_wagers.map(row => (
                  <tr key={row._id} className={(row.win === null) ? "" : ((row.win === true) ? "wager-win-row" : "wager-lose-row")}>
                    <td className="left-align">
                      <button
                        className="btn-flat"
                        onClick={() => this.onMatchFilterClick(row.match.tournament.name)}> 
                        <img className="search-match-tournament-img" src={process.env.PUBLIC_URL + row.match.tournament.tournament_logo} />
                      </button>
                    </td>
                    <td className="center-align">
                      <div className="row search-info-row-container">
                        <span className="search-info-datetime">{renderMatchDate(new Date(row.match.match_date))}</span>
                      </div>
                      <div className="row search-info-row-container">
                        <span className="search-info-datetime">{renderMatchTime(new Date(row.match.match_date))}</span>
                      </div>
                    </td>
                    <td className="right-align" component="th" scope="row">
                      <button className="btn-flat">            
                        <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.home_team.logo_small} />
                      </button>
                    </td>
                    <td className="center-align" component="th" scope="row">
                      <Link to={`/showMatch/${row.match_id}`} className="dash-link">
                        <span className="versus-small">vs.</span>
                      </Link>
                    </td>
                    <td className="left-align" component="th" scope="row">
                      <button className="btn-flat">
                        <img className="search-match-img" src={process.env.PUBLIC_URL + row.match.away_team.logo_small} />
                      </button>
                    </td>
                    <td className="center-align">
                    <img className="search-match-img" src={process.env.PUBLIC_URL + row.team_logo} />
                    </td>
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

ViewParlay.propTypes = {
  showParlay: PropTypes.func.isRequired,
  showWager: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { showParlay, showWager })(withRouter(ViewParlay));