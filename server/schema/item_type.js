const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLBoolean, GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const Item = require("../models/item");

const ItemType = new GraphQLObjectType({
  name: "ItemType",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return Item.findById(parentValue)
          .populate("user")
          .then(item => {
            return item.user;
          });
      }
    }
  })
});

module.exports = ItemType;
