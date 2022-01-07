const express = require("express");
const {
  getTodos,
  createTodo,
  DeleteTodo,
} = require("../controllers/todoControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//NB: These routes are protected!
router.route("/").get(protect, getTodos);
router.route("/create").post(protect, createTodo);
router.route("/:id").delete(protect, DeleteTodo);

module.exports = router;
