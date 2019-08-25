import React, { Component } from "react";
import AuthForm from "./AuthForm";
import mutation from "../mutations/Login";
import query from "../queries/fetchUser";
import { graphql } from "react-apollo";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push("/dashboard");
    }
  }
  //mutations here are all promises
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }
  render() {
    return (
      <div>
        <div className="login-form">
          <h3 className="title blue-grey-text text-darken-1">Login</h3>
          <AuthForm
            errors={this.state.errors}
            onSubmit={this.onSubmit.bind(this)}
          />
          <div className="row">
            <div className="ex-info card col s12 m8 offset-m2">
              <div className="card-content blue-grey-text text-darken-1">
                <div style={{ display: "block", marginBottom: "10px" }}>
                  <b>Use the test credentials:</b>
                </div>
                <div style={{ display: "block", marginBottom: "5px" }}>
                  Email:&nbsp;test@test.com
                </div>
                <div style={{ display: "block" }}>Password:&nbsp;test</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));
