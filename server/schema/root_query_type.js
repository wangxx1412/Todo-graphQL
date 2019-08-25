const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require("./user_type");
const ItemType = require("./item_type");
const Item = require("../models/item");
const User = require("../models/user");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    todos: {
      type: new GraphQLList(ItemType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findTodos(id);
      }
    },
    item: {
      type: ItemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Item.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
