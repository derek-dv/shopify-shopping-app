import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";
import { isAuth } from "../../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).status({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).send({ message: "New order added", order: createdOrder });
    }
  })
);

export default orderRouter;
