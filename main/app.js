const express = require("express");
// DB connexion
import mongoose from "mongoose";
import { User } from "main/models/schemas/users.js";

mongoose
  .connect(
    "mongodb+srv://ToDoList:ToDoList123@todolist.ugemjtt.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const indexRouter = require("./routes/index");
// Protect est optionnel (test)
const protectRouter = require("./routes/protect");
const authentification = require("./middleware/auth.js");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/protect", authentification, protectRouter);
app.listen(9000, () => {
  console.log("active au port 9000");
});
module.exports = app;
