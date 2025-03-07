// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/Product'); // Assuming you have a Product model

// Add to Cart Route
router.post('/cart/add', async (req, res) => {
  const { productId, userId } = req.body; // Assuming you send productId and userId from the client

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error });
  }
});

module.exports = router;
