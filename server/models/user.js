const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Todo = require("./item");

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "todo"
      }
    ]
  },
  {
    usePushEach: true
  }
);

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
  const Todo = mongoose.model("todo"); //Closure!: Without this line, "Error: Todo is not a constructor"
  return this.findById(userId).then(async user => {
    const todo = await new Todo({ content, user });
    await user.todos.push(todo);
    return Promise.all([todo.save(), user.save()]).then(([todo, user]) => user);
  });
};

UserSchema.statics.findTodos = function(userId) {
  return this.findById(userId)
    .populate("todos")
    .then(user => user.todos);
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
