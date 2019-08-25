import gql from "graphql-tag";

export default gql`
  query ItemsQuery($id: ID!) {
    todos(id: $id) {
      id
      content
      done
    }
  }
`;
