import express from "express";
import Product from "../Models/ProductModel.js";
import data from "../Data/productData.js";
import UserData from '../Data/UserData.js'
import User from '../Models/UserModel.js'

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {

//   putting hard product data in mongodb
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);

//   putting hard user data in mongodb
  await User.deleteMany({});
  const createdUsers = await User.insertMany(UserData.users);

  res.status(200).json({ createdProducts, createdUsers });
});
export default seedRouter;
