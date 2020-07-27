const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Todo = mongoose.model("Todo");

const router = express.Router();
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const todos = await Track.find({ userId: req.user._id });
  res.send(todos);
});

router.post("/todos", async (req, res) => {
  const { name, todos } = req.body;

  console.log(req.body);

  if (!name || !todos) {
    return res
      .status(422)
      .send({ error: "You must provide a name and a location" });
  }

  try {
    const todo = new Todo({ name, todos, userId: req.user._id });
    await todo.save();
    res.send(todo);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
