const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const ItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  content: String,
  done: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

ItemSchema.statics.done = function(id) {
  return this.findById(id).then(item => {
    item.done = true;
    return item.save();
  });
};

ItemSchema.statics.unDone = function(id) {
  return this.findById(id).then(item => {
    item.done = false;
    return item.save();
  });
};

ItemSchema.statics.deleteItemFromUser = function(itemId) {
  //Need to add checking auth user equal to item's author then delete
  return this.findById(itemId).then(async item => {
    await User.findById(item.user._id).then(async user => {
      await user.todos.pull(item);
      await user.save();
    });
    await Item.deleteOne({ _id: itemId });
  });
};

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
