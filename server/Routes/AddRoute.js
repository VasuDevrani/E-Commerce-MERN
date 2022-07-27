import express from "express";
import Product from "../Models/ProductModel.js";

const addRouter = express.Router();

addRouter.post("/", async (req, res) => {
  //   putting hard product data in mongodb
  console.log(req.method);

  try {
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
    });
    const product = await newProduct.save();

    res.status(200).json({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      brand: product.brand,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
      rating: product.rating,
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});
export default addRouter;
