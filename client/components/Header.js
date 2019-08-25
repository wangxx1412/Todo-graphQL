import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import query from "../queries/fetchUser";
import mutation from "../mutations/Logout";
import { withRouter } from "react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Header extends Component {
  onLogoutClick() {
    this.props
      .mutate({
        refetchQueries: [{ query }]
      })
      .then(history.push("/"));
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <div>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <Link to="/" className="brand-logo left">
              Todo
            </Link>
            <ul className="right">{this.renderButtons()}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(graphql(query)(withRouter(Header)));
