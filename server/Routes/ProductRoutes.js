import express from "express";

// product data
import ProductModel from "../Models/ProductModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.method);
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: "can't fetch products" });
  }
});

router.get("/slug/:slug", async (req, res) => {
  console.log(req.method);
  try {
    const product = await ProductModel.findOne(
      {slug: req.params.slug}
    );

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send({ message: "No such product found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.method);

  try {
    const product = await ProductModel.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send({ message: "No such product found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
