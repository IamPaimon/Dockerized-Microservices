const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/testdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Item = mongoose.model("Item", { name: String });

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/add", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.listen(5000, () => console.log("Server running on port 5000"));
