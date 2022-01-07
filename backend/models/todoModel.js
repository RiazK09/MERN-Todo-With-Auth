const mongoose = require("mongoose");

/* Data Schema 
This Schema will have a user to which the item belongs to. */
const todoSchema = mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Created a data model using the model() method
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
