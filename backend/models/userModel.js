const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* Data Schema
Email is set to unique=true as no two users can have the same email address. */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* This function serves to encrypt the user's password in the database for safety 
purposes. */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//This function serves to decrypt the password.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Created a data model using the model() method
const User = mongoose.model("User", userSchema);
module.exports = User;
