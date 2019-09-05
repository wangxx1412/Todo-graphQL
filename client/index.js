import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";

const App = loadable(() => import("./components/App"));

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "/graphql"
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  cache,
  link
});

const Root = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
