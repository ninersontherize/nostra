import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getMyLeagues, showLeague } from "../../actions/leagueActions";
import { getMyWagers, getLeagueInfo } from "../../actions/wagerActions";
import { searchMatch } from "../../actions/matchActions";


class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      wager_search_results: [],
      wagers_empty: false,
      league_search_results: [],
      leagues_empty: false,
      follower_results: [],
      username: "",
      status: "",
      earnings: "",
      favorite_team: "",
      errors: {}
    };
  }

  
}