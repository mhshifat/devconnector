import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { userLogoutAction } from "../../store/actions/authActions";

class Navbar extends Component {
  onClickHandler = e => {
    e.preventDefault();
    localStorage.removeItem("devconnector");
    delete axios.defaults.headers.common["Authorization"];
    this.props.userLogoutAction();
    window.location.href = "/login";
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <img
            src={user.avatar}
            alt={user.name}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
          />
          <a onClick={this.onClickHandler} className="nav-link" href="">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { userLogoutAction }
)(Navbar);
