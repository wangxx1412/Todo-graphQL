const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const ItemType = require("./item_type");
const User = require("../models/user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    todos: {
      type: new GraphQLList(ItemType),
      resolve(parentValue) {
        return User.findTodos(parentValue.id);
      }
    }
  }
});

module.exports = UserType;
