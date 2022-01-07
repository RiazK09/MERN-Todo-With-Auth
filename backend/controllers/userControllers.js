//asyncHandler will handle all the errors in my application.
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");

/* Function to register a user, which will request: name, email, password from the
user. */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Check to see if user exists in the database.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //If user does not exist, we create a new user in the database.
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //JWT
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred!");
  }
});

/* Function to Authorise a user, which will request: email & password from the
user. */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //JWT
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
