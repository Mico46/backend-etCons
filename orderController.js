const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const { items, total, address } = req.body;

    const order = new Order({
      items,
      total,
      address
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};