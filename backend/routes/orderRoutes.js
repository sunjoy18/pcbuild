const express = require('express');
const authenticateToken = require('../middleware/auth');
const Cart = require("../models/cart.js");
const Order = require("../models/Order.js");

const router = express.Router();

// Place an order
router.post("/", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const newOrder = new Order({
      userId: req.user.userId,
      items: cart.items,
      total: cart.total,
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId: req.user.userId });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Order placement failed" });
  }
});

// Get user orders
router.get("/", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ⬇️ Use module.exports instead of export default
module.exports = router;
