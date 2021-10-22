import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/vinoteka", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.get("/api/wines/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) res.send(product);
//   else res.status(404).send({ message: "Product not Found" });
// });

app.use("/api/users", userRouter);

app.use("/api/wines", productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/wine/:id", async (req, res) => {
  res.send(req.params.id);
});

// error catcher
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
