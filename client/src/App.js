import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import 'materialize-css/dist/css/materialize.min.css';


import { Provider } from "react-redux"
import store from "./store";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Home from "./components/layout/Landing"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import EmailSent from "./components/auth/EmailSent";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/NewDashboard";
import CreateLeague from "./components/league/CreateLeague";
import SearchLeague from "./components/league/SearchLeague";
import SearchMatch from "./components/match/SearchMatch";
import ShowMatch from "./components/match/ShowMatch";
import SearchUser from "./components/user/SearchUser";
import AdminSetOdds from "./components/match/AdminSetOdds";
import OddsInfo from "./components/wager/OddsInfo";
import UserSettings from "./components/user/UserSettings";
import LcsPowerRankingsWeek1 from "./components/blog/LcsPowerRankingsWeek1";
import LcsPowerRankingsWeek2 from "./components/blog/LcsPowerRankingsWeek2";
import LcsPowerRankingsWeek3 from "./components/blog/LcsPowerRankingsWeek3";

import "./App.css";
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import JoinLeague from './components/league/JoinLeague';
import MyLeagues from './components/league/MyLeagues';
import MyWagers from './components/wager/MyWagers';
import UserProfile from './components/user/UserProfile';
import AdminMatchSearch from './components/match/AdminMatchSearch';
import AdminResolveMatch from './components/match/AdminResolveMatch';
import CreateParlay from './components/wager/CreateParlay';

//Check fro token to keep user logged in
if (localStorage.jwtToken) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decode token and get user info and exp
  const decoded = jwt_decode(token);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Sidebar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/reset/:token" component={ResetPassword} />
            <Route exact path="/emailSent" component={EmailSent} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/createLeague" component={CreateLeague} />
              <PrivateRoute exact path="/searchLeague" component={SearchLeague} />
              <PrivateRoute exact path="/joinLeague/:league_id" component={JoinLeague} />
              <PrivateRoute exact path="/myLeagues" component={MyLeagues} />
              <PrivateRoute exact path="/searchMatch" component={SearchMatch} />
              <PrivateRoute exact path="/showMatch/:match_id" component={ShowMatch} />
              <PrivateRoute exact path="/myWagers" component={MyWagers} />
              <PrivateRoute exact path="/userProfile/:user_id" component={UserProfile} />
              <PrivateRoute exact path="/searchUser" component={SearchUser} />
              <PrivateRoute exact path="/adminSetOdds/:match_id" component={AdminSetOdds} />
              <PrivateRoute exact path="/adminMatchSearch" component={AdminMatchSearch} />
              <PrivateRoute exact path="/adminResolveMatch/:match_id" component={AdminResolveMatch} />
              <PrivateRoute exact path="/oddsInfo" component={OddsInfo} />
              <PrivateRoute exact path="/lcsPowerRankings/week1" component={LcsPowerRankingsWeek1} />
              <PrivateRoute exact path="/lcsPowerRankings/week2" component={LcsPowerRankingsWeek2} />
              <PrivateRoute exact path="/lcsPowerRankings/week3" component={LcsPowerRankingsWeek3} />
              <PrivateRoute exact path="/userSettings/:user_id" component={UserSettings} />
              <PrivateRoute exact path="/createParlay" component={CreateParlay} />
            </Switch>
          </div>
        </Router> 
      </Provider> 
    );
  }
}

export default App;
