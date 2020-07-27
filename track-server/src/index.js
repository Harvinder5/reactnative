require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("../src/routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0-kmyeq.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("connected  to mongo instance");
});

mongoose.connection.on("error", error => {
  console.error("Error connnecting to mongo" + error);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your Email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
