import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLeague } from "../../actions/leagueActions";
import classnames from "classnames"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const isEmpty = require("is-empty");

class SearchLeague extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      search_results: [],
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    var searchData = {}

    if (!isEmpty(this.state.search)) {
      searchData = this.state.search;
    }
    
    console.log(searchData);

    await this.props.searchLeague(searchData).then(res => {
            this.setState({ 
              search: "",
              search_results: res 
            });
            console.log(this.state.search_results);
          });
  };

  componentDidMount() {
    this.props.searchLeague().then(res => {
      this.setState({ search_results: res });
      console.log(this.state.search_results);
    });
  };

  render() {
    const{ errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Search</b> for a league
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.search}
                  error={errors.search}
                  id="search"
                  type="text"
                  className={classnames('', { invalid: errors.search })}
                />
                <label htmlFor="name">Search</label>
                <span className="red-text">{errors.search}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Search
                  </button>
              </div>
            </form>
            <Table className="minwidth: 650" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>League Name</TableCell>
                  <TableCell align="right">Max Players</TableCell>
                  <TableCell align="right">Starting Bankroll</TableCell>
                  <TableCell align="right">Leagues Supported</TableCell>
                  <TableCell align="right">Private</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.search_results.map(row => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/joinLeague/${row._id}`}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.max_players}</TableCell>
                    <TableCell align="right">{row.starting_cash}</TableCell>
                    <TableCell align="right">{row.leagues_supported}</TableCell>
                    <TableCell align="right">{row.private}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

SearchLeague.propTypes = {
  searchLeague: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchLeague })(SearchLeague);