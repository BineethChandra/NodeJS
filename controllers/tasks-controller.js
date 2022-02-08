const Task = require("../models/tasks-model");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ mssg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ _id: taskID });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ mssg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ mssg: `No task with id : ${taskID}` });
  }
  res.status(200).json({
    status: "Success!",
    task: null,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
