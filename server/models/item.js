const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const TodoSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  done: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

TodoSchema.statics.done = function(id) {
  return this.findById(id).then(todo => {
    todo.done = true;
    return todo.save();
  });
};

TodoSchema.statics.unDone = function(id) {
  return this.findById(id).then(todo => {
    todo.done = false;
    return todo.save();
  });
};

TodoSchema.statics.deleteItemFromUser = function(todoId) {
  //Need to add checking auth user equal to item's author then delete
  return this.findById(todoId).then(async todo => {
    await User.findById(todo.user._id).then(async user => {
      await user.todos.pull(todo);
      await user.save();
    });
    await Todo.deleteOne({ _id: todoId });
  });
};

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
