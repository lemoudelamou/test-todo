const Todo = require("../models/Todo");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all Todos
// @route GET /todos
// @access Private
const getAllTodos = asyncHandler(async (req, res) => {
  
  const todos = await Todo.find().lean();


  if (!todos?.length) {
    return res.status(400).json({ message: "No Todos found" });
  }


  const todosWithUser = await Promise.all(
    todos.map(async (todo) => {
      const user = await User.findById(todo.user).lean().exec();
      return { ...todo, email: user.email };
    })
  );

  res.json(todosWithUser);
});

// @desc Create new Todo
// @route POST /todos
// @access Private
const createNewTodo = asyncHandler(async (req, res) => {
  const { user, title, description } = req.body;

  // Confirm data
  if (!user || !title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await Todo.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Create and store the new user
  const newTodo = await Todo.create({ user, title, description });

  if (newTodo) {
    // Created
    return res.status(201).json({ message: "New note created" });
  } else {
    return res.status(400).json({ message: "Invalid note data received" });
  }
});

// @desc Update a Todo
// @route PATCH /todos
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id, user, title, description, done } = req.body;

  // Confirm data
  if (!id || !user || !title || !description || typeof done !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm Todo exists to update
  const todo = await Todo.findById(id).exec();

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  // Check for duplicate title
  const duplicate = await Todo.findOne({ title }).lean().exec();

  // Allow renaming of the original Todo
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Todo title" });
  }

  todo.user = user;
  todo.title = title;
  todo.description = description;
  todo.done = done;

  const updatedTodo = await todo.save();

  res.json(`'${updatedTodo.title}' updated`);
});

// @desc Delete a Todo
// @route DELETE /todos
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Todo ID required" });
  }

  // Confirm Todo exists to delete
  const todo = await Todo.findById(id).exec();

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  const result = await todo.deleteOne();

  const reply = `Todo '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
};
