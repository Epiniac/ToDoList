const express = require("express");
const indexRouter = require("./routes/index");
const protectRouter = require("./routes/protect");
const authentification = require("./middleware/authentifcation.js");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/protect",authentification, protectRouter);
app.listen(9000,()=>{
  console.log("active au port 9000");
})
module.exports = app;

