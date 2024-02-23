const mongoose = require("mongoose");
const Todo = require("../models/Todo");
require("dotenv").config();

describe("Todo Model", () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the todos collection after each test
    await Todo.deleteMany({});
  });

  it("should create and save a new todo successfully", async () => {
    const todoData = {
      title: "Test Todo",
      description: "This is a test todo",
      important: true,
      done: false,
      user: new mongoose.Types.ObjectId(),
    };
    const todo = new Todo(todoData);
    const savedTodo = await todo.save();

    expect(savedTodo._id).toBeDefined();
    expect(savedTodo.title).toBe(todoData.title);
    expect(savedTodo.description).toBe(todoData.description);
    expect(savedTodo.important).toBe(todoData.important);
    expect(savedTodo.done).toBe(todoData.done);
    expect(savedTodo.user.toString()).toBe(todoData.user.toString());
  });
});
