const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/User");
require("dotenv").config();

describe("User Model", () => {
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

  it("should create and save a new user successfully", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email.toLowerCase()).toBe(userData.email.toLowerCase());

    expect(savedUser.password).toBe(userData.password);
  });
});
