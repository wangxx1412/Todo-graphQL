import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import query from "../queries/fetchItems";

class TodoCreate extends Component {
  state = { content: "" };

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          userId: this.props.Authorization.user.id
        },
        refetchQueries: [
          { query: query, variables: { id: this.props.Authorization.user.id } }
        ]
      })
      .then(() => {
        this.props.history.push("/dashboard");
      });
  }
  render() {
    if (!this.props.isLoggedin()) {
      console.log("Only logged in users can see this page");
      this.props.history.push("/login");
    }
    return (
      <div className="todo-create">
        <Link to="/dashboard">
          <button className="waves-effect waves-red btn indigo lighten-3">
            Back
          </button>
        </Link>
        <h3 className="blue-grey-text text-darken-1">Create a new Todo</h3>
        <form className="create-form" onSubmit={this.onSubmit.bind(this)}>
          <label>Todo:</label>
          <input
            onChange={event => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
          <button
            className="waves-effect waves-light btn submit-btn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation addTodo($userId: ID, $content: String) {
    addItemToUser(userId: $userId, content: $content) {
      id
    }
  }
`;

export default graphql(mutation)(TodoCreate);
