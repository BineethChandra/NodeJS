const express = require("express");
const app = express();
const tasks = require("./routes/tasks-router");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

//middileware
app.use(express.static("./public"));
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to the DB...");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};
start();
