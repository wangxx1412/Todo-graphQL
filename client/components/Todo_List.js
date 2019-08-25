import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import query from "../queries/fetchItems";
import { Query } from "react-apollo";

class TodoList extends Component {
  state = { userId: this.props.user.id };

  deleteTodo(id) {
    this.props.deleteTodo({
      variables: { id: id },
      refetchQueries: [{ query: query, variables: { id: this.state.userId } }]
    });
  }

  doneTodo(id) {
    this.props.doneTodo({
      variables: { id: id },
      refetchQueries: [{ query: query, variables: { id: this.state.userId } }]
    });
  }

  unDoneTodo(id) {
    this.props.unDoneTodo({
      variables: { id: id },
      refetchQueries: [{ query: query, variables: { id: this.state.userId } }]
    });
  }

  renderTodos(todos) {
    return todos.map(({ id, content, done }) => {
      if (done) {
        return null;
      }
      return (
        <li key={id} className="collection-item todo">
          <div>{content}</div>
          <div>
            <i
              className="material-icons waves-effect waves-light"
              onClick={() => this.doneTodo(id)}
            >
              done
            </i>
            <i
              className="material-icons waves-effect waves-light"
              onClick={() => this.deleteTodo(id)}
            >
              delete
            </i>
          </div>
        </li>
      );
    });
  }

  renderDones(todos) {
    return todos.map(({ id, content, done }) => {
      if (!done) {
        return null;
      }
      return (
        <li key={id} className="collection-item todo">
          <div>{content}</div>
          <div>
            <i
              className="material-icons waves-effect waves-light"
              onClick={() => this.unDoneTodo(id)}
            >
              replay
            </i>
            <i
              className="material-icons waves-effect waves-light"
              onClick={() => this.deleteTodo(id)}
            >
              delete
            </i>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <Query query={query} variables={{ id: this.props.user.id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div className="loading" />;
          }
          return (
            <div>
              <div className="row create-btn">
                <div className="col s12">
                  <Link
                    to="/todo/create"
                    className="waves-effect waves-light btn indigo lighten-3"
                  >
                    Create new Todo
                  </Link>
                </div>
              </div>
              <div className="row todolist">
                <div className="col s12 l5">
                  <h4 className="blue-grey-text text-darken-1">Todo List</h4>
                  <ul className="collection list">
                    {this.renderTodos(data.todos)}
                  </ul>
                </div>
                <div className="col s12 l5 offset-l1">
                  <h4 className="blue-grey-text text-darken-1">
                    Finished List
                  </h4>
                  <ul className="collection list">
                    {this.renderDones(data.todos)}
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const DELETE_TODO = gql`
  mutation DeleteItem($id: ID) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DONE_TODO = gql`
  mutation DoneItem($id: ID) {
    doneItem(id: $id) {
      id
      content
      done
    }
  }
`;

const UNDONE_TODO = gql`
  mutation unDoneItem($id: ID) {
    unDoneItem(id: $id) {
      id
      content
      done
    }
  }
`;

export default compose(
  graphql(DELETE_TODO, { name: "deleteTodo" }),
  graphql(DONE_TODO, { name: "doneTodo" }),
  graphql(UNDONE_TODO, { name: "unDoneTodo" })
)(TodoList);
