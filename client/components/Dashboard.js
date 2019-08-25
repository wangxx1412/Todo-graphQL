import React, { Component } from "react";
import TodoList from "./Todo_List";

class Dashboard extends Component {
  render() {
    if (!this.props.isLoggedin()) {
      console.log("Only logged in users can see this page");
      this.props.history.push("/login");
      return <div>You must login to continue</div>;
    }
    return <TodoList user={this.props.Authorization.user} />;
  }
}

export default Dashboard;
