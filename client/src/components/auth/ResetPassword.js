import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { validateToken, updatePassword } from "../../actions/authActions";
import classnames from "classnames";
import { connect } from "react-redux";
const isEmpty = require("is-empty");

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      errors: {}
    };
  }
  
  componentDidMount() {
    const tokenData = {
      resetPasswordToken: this.props.match.params.token
    };

    this.props.validateToken(tokenData).then(email => {
      this.state.email = email;
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };
    console.log(this.props.history);
    this.props.updatePassword(userData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    if (!isEmpty(errors)) {
      return (
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s9 offset-s2">
              <Link to="/" classname="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to Home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Oops</b> Something went wrong
                </h4>
                <p className="grey-text text-darken-1">
                  Please try sending another email <Link to="/forgotPassword">here.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s9 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to Home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Enter</b> a new password
                </h4>
                <p className="grey-text text-darken-1">
                  Here by mistake? <Link to="/login">Log in here</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", { invalid: errors.password })}
                  />
                  <label htmlFor="password">New Password</label>
                  <span className="red-text">
                    {errors.password}
                  </span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.confirm_password}
                    error={errors.confirm_password}
                    id="confirm_password"
                    type="password"
                    className={classnames("", { invalid: errors.confirm_password })}
                  />
                  <label htmlFor="password">Confirm New Password</label>
                  <span className="red-text">
                    {errors.confirm_password}
                  </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "300px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                      Confirm Password
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

ResetPassword.propTypes = {
  validateToken: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { validateToken, updatePassword })(withRouter(ResetPassword));
