const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*', // TODO: Replace '*' with your frontend domain for production
}));

// TEMP in-memory inventory
let inventory = [];

// Test route
app.get("/", (req, res) => {
  res.send("API is live");
});

// Get inventory
app.get("/inventory", (req, res) => {
  res.json(inventory);
});

// Add item
app.post("/inventory", (req, res) => {
  const item = req.body;
  inventory.push(item);
  res.status(201).json({ message: "Item added", item });
});

// Delete item
app.delete("/inventory/:id", (req, res) => {
  inventory = inventory.filter(i => i.id !== req.params.id);
  res.json({ message: "Item deleted" });
});

if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}