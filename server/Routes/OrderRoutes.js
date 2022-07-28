import express from "express";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/get", async (req, res) => {

    // console.log(req.body);

  try{

    const orders = await Order.find({userId: req.body.userId});
    res.status(200).json(orders);

  }catch(err){
    res.status(400).json({message: err.message});
  }
});

orderRouter.post("/", async (req, res) => {
//   console.log(req.body);

  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalPrice: req.body.totalPrice,
      userId: req.body.userId,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  } catch (err) {
    res.status(404).json({message: err.message})
  }
});

export default orderRouter;
