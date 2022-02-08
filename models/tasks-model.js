const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "must provide name!"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const tasks = mongoose.model("Task", TaskSchema);
module.exports = tasks;
