import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/wines", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/wine/:id", async (req, res) => {
  res.send(req.params.id);
});

//const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server listening at http://localhost:5000`);
});
