import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import TodoCreate from "./TodoCreate";
import requireAuth from "./requireAuth";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends Component {
  state = { user: "" };

  render() {
    return (
      <Router history={history}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
            <Route
              exact
              path="/todo/create"
              component={requireAuth(TodoCreate)}
            />
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
