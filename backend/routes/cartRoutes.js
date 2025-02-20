const express = require('express');
const Cart = require("../models/cart")
const Product = require("../models/product")
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get cart items for a user
router.get("/", authenticateToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate("items.productId");
        res.json(cart || { items: [], total: 0 });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});

// Add item to cart
router.post("/add", authenticateToken, async (req, res) => {
    console.log("📌 Received request to add item to cart");
    console.log("✨ user : ", req.body);

    const productId = req.body.productId
    try {
        const product = await Product.findOne({ _id: productId });
        const { name, price, quantity } = product;
        console.log("📌 Request body:", { productId, name, price, quantity });

        let cart = await Cart.findOne({ userId: req.user.userId });
        console.log("📌 Fetched cart for user:", cart ? "Cart found" : "No cart found");

        if (!cart) {
            cart = new Cart({ userId: req.user.userId, items: [], total: 0 });
            console.log("📌 Created new cart for user:", req.user.userId);
        }

        const existingItem = cart.items.find((item) => item.productId.equals(productId));
        if (existingItem) {
            console.log("📌 Item already in cart, updating quantity");
            existingItem.quantity += quantity;
        } else {
            console.log("📌 Adding new item to cart");
            cart.items.push({ productId, name, price, quantity });
        }

        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        console.log("📌 Updated cart total:", cart.total);

        await cart.save();
        console.log("✅ Cart updated and saved successfully");

        res.json(cart);
    } catch (error) {
        console.error("❌ Error adding item to cart:", error);
        res.status(500).json({ error: "Failed to add item" });
    }
});


// Remove item from cart
router.delete("/remove/:productId", authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        cart.items = cart.items.filter((item) => !item.productId.equals(productId));
        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Failed to remove item" });
    }
});

// Update item quantity
router.put("/update", authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const item = cart.items.find((item) => item.productId.equals(productId));
        if (!item) return res.status(404).json({ error: "Item not found" });

        item.quantity = quantity;
        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

// Clear cart (after order placement)
router.delete("/clear", authenticateToken, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user.userId });
        res.json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ error: "Failed to clear cart" });
    }
});

module.exports = router;
