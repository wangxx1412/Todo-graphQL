import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <h3 className="blue-grey-text text-darken-1">
            Try this App by Signup
          </h3>
        </div>
        <div className="subTitle container">
          <div className="card-panel red lighten-2 white-text subtitle-content">
            <div className="app-info">
              <i className="material-icons">lightbulb_outline</i>
              <span>Based on React, Express and GraphQL</span>
            </div>
            <a
              href="https://github.com/wangxx1412/Todo-graphQL"
              className="waves-effect waves-light btn code-btn indigo lighten-3"
            >
              Code
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
