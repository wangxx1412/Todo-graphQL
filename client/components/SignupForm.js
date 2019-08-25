import React from "react";
import AuthForm from "./AuthForm";
import mutation from "../mutations/Signup";
import query from "../queries/fetchUser";
import { graphql } from "react-apollo";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push("/dashboard");
    }
  }
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
      <div className="signup-form">
        <h3 className="title blue-grey-text text-darken-2">Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(SignupForm));
