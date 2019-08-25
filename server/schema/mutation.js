const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Item = require("../models/item");
const User = require("../models/user");
const UserType = require("./user_type");
const ItemType = require("./item_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItemToUser: {
      type: UserType,
      args: {
        content: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parentValue, { content, userId }) {
        return User.addTodo(userId, content);
      }
    },
    doneItem: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Item.done(id);
      }
    },
    unDoneItem: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Item.unDone(id);
      }
    },
    deleteItem: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Item.deleteItemFromUser(id);
      }
    },
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    }
  }
});

module.exports = mutation;
