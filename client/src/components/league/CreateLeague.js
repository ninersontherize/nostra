import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createLeague } from "../../actions/leagueActions";
import classnames from "classnames"

const OPTIONS = ["LCS", "LEC"];

class CreateLeague extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      game: "League of Legends",
      leagues_supported: ["LCS", "LEC"],
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      private: false,
      max_players: "",
      starting_cash: 20000,
      in_progress: false,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    await this.updateLeaguesSupported();

    const newLeague = {
      name: this.state.name,
      game: this.state.game,
      leagues_supported: this.state.leagues_supported.filter((v, i, a) => a.indexOf(v) === i),
      private: this.state.private,
      max_players: this.state.max_players,
      starting_cash: this.state.starting_cash,
      in_progress: this.state.in_progress,
      league_owner: this.props.auth.user.id,
      user_id: this.props.auth.user.id
    };

    this.props.createLeague(newLeague, this.props.history);
  };

  updateLeaguesSupported = () => {
    Object.keys(this.state.checkboxes)
    .filter(checkbox => this.state.checkboxes[checkbox])
    .forEach(checkbox => {
      let addedLeagues = this.state.leagues_supported.concat(checkbox);
      this.setState({ leagues_supported: addedLeagues }, () => {
        console.log(this.state.leagues_supported);
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    console.log("checkbox changed!");
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };
  
  handleSwitchChange = event => {
    const { name } = event.target;
    console.log(event.target.value);
    this.setState({ [name]: !this.state.private }, () => {
      console.log(this.state.private);
    });
  };

  render() {
    const{ errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="header-text">
                <b>Create</b> a league
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="section">
                <div className="row row-input-field">
                  <div className="input-field col s8 offset-s2">
                    <input
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                      className={classnames('', { invalid: errors.name })}
                    />
                    <label htmlFor="name">League Name</label>
                    <span className="red-text">{errors.name}</span>
                  </div>
                </div>
                <div className="row row-input-field-bottom">
                  <div className="input-field col s8 offset-s2">
                    <input
                      onChange={this.onChange}
                      value={this.state.max_players}
                      error={errors.max_players}
                      id="max_players"
                      type="number"
                      className={classnames('', { invalid: errors.max_players })}
                    />
                    <label htmlFor="name">Number of Players</label>
                    <span className="red-text">{errors.max_players}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="create-league-checkbox-container">
                    <label component="legend">Select which leagues you'll be able to place bets on</label>
                    <div className="section">
                      <div className="row">
                        <div className="col s3 offset-s3">
                          <label>
                            <input type="checkbox" color="primary" name="LCS" checked={this.state.checkboxes["LCS"]} onChange={this.handleCheckboxChange} value="lcs" />
                            <span><img className="search-match-tournament-img" src={process.env.PUBLIC_URL + "/lcs/lcs_logo.png"} /></span>
                          </label>
                        </div>
                        <div className="col s3">
                          <label>
                            <input type="checkbox" color="primary" name="LEC" checked={this.state.checkboxes["LEC"]} onChange={this.handleCheckboxChange} value="lec" />
                            <span><img className="search-match-tournament-img" src={process.env.PUBLIC_URL + "/lec/lec_logo.png"} /></span>
                          </label>
                        </div>
                      </div>         
                    </div>            
                  </div>
                </div>
                <div className="row">
                  <div className="switch">
                    <label>
                      Public
                      <input type="checkbox" color="primary" name="private" checked={this.state.private} onChange={this.handleSwitchChange} value="private" 
                      label="Private" />
                      <span className="lever"></span>
                      Private
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "250px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-flat waves-effect waves-light hoverable nostra-button">
                        Create League
                      </button>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateLeague.propTypes = {
  createLeague: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createLeague })(withRouter(CreateLeague));