const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
//This will allow me to receive information from the front-end in JSON format.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//This line is required in order to access the API in the React frontend.
app.use(cors());
dotenv.config();
/* Connection to MongoDB can be found in a folder called config. The filename = db.js */
connectDB();

//API Endpoints
app.get("/", (req, res) => {
  res.send("Api is running...");
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

//Port 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
