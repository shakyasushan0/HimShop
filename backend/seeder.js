import User from "./model/User.js";
import Product from "./model/Product.js";
import Order from "./model/Order.js";
import mongoose from "mongoose";

// dummy data
import products from "./data/products.js";
import users from "./data/users.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then((conn) => console.log(`Connected to db at ${conn.connection.host}`))
  .catch((err) => console.log("Error connecting to DB", err.message));

const loadData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    const addedUsers = await User.insertMany(users);
    const adminId = addedUsers[0]._id;
    const addedProducts = await Product.insertMany(
      products.map((p) => {
        return { ...p, user: adminId };
      }),
    );
    console.log("Data Loaded Successfully...");
    process.exit(0);
  } catch (err) {
    console.log("Error loading DB", err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("DB cleared...");
    process.exit(0);
  } catch (err) {
    console.log("Error destoying data:", err.message);
    process.exit(1);
  }
};

loadData();
