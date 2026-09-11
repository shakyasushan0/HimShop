import Order from "../model/Order.js";

const addOrder = async (req, res) => {
  const {
    orderItems,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    shippingAddress,
    paymentMethod,
  } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
  });
  res.send({ message: "Order created!", orderId: order._id });
};

const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "fullname email");
  res.send(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found!" });
  res.send(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
};

const payOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ message: "Order not found" });
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();
  res.send({ message: "Order paid successfully!" });
};

const deliverOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ message: "Order not found" });
  if (!order.isPaid) return res.status(400).send({ error: "Order not paid!" });
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  res.send({ message: "Order delivered successfully" });
};

export {
  addOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  payOrder,
  deliverOrder,
};
