const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");

/* This function will find all the todos belonging to a particular user. */
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

const createTodo = asyncHandler(async (req, res) => {
  const { item } = req.body;

  if (!item) {
    res.status(400);
    throw new Error("Please Fill out the Field");
  } else {
    const todo = new Todo({ user: req.user._id, item });
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  }
});

const DeleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (todo) {
    await todo.remove();
    res.json({ message: "todo Removed" });
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

module.exports = { getTodos, createTodo, DeleteTodo };
