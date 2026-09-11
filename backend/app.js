import express from "express";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import uploadRouter from "./routes/upload.route.js";
import mongoose from "mongoose";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((conn) => console.log(`Connected to db at ${conn.connection.host}`))
  .catch((err) => console.log("Error connecting to DB", err.message));

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get("/", (req, res) => {
  res.send({ message: "Server is up and running" });
});

app.use("/api/products", productRouter);
app.use("/api/auth", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.listen(3000, () => console.log("Server is up and running"));
