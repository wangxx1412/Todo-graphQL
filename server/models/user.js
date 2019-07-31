const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Item = require("./item");

const UserSchema = new Schema({
  email: String,
  password: String,
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "item"
    }
  ]
});

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.statics.addTodo = function(userId, content) {
  return this.findById(userId).then(async user => {
    const item = await new Item({ content, user });
    await user.todos.push(item);
    return Promise.all([item.save(), user.save()]).then(([item, user]) => user);
  });
};

UserSchema.statics.findTodos = function(userId) {
  return this.findById(userId)
    .populate("todos")
    .then(user => user.todos);
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
