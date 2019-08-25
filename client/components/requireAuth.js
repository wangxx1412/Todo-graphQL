import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../queries/fetchUser";

export default WrappedComponent => {
  class RequireAuth extends Component {
    // Check if there is validated user logged
    isLoggedin = () => {
      return this.props.Authorization.user;
    };

    // Check if the Authorization query is loading
    isLoading = () => {
      return this.props.Authorization.loading;
    };

    render() {
      if (this.isLoading()) {
        return (
          <div className="loader center">
            <i
              className="fa fa-circle-o-notch fa-spin fa-5x fa-fw"
              style={{ color: "#9fa8da" }}
            />
            <span className="sr-only">Loading...</span>
          </div>
        );
      }
      return (
        <WrappedComponent
          {...this.props}
          isLoggedin={this.isLoggedin}
          isLoading={this.isLoading}
        />
      );
    }
  }

  return graphql(query, { name: "Authorization" })(RequireAuth);
};
