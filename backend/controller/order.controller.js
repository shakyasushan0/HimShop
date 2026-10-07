import Order from "../model/Order.js";
import crypto from "crypto";

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
  const order = await Order.findById(id).populate(
    "user",
    "fullname email isAdmin",
  );
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

const getEsewaPaymentDetails = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ message: "Order not found" });
  const tran_uuid = Date.now() + "_" + order._id;
  const message = `total_amount=${order.totalPrice},transaction_uuid=${tran_uuid},product_code=EPAYTEST`;
  const signature = crypto
    .createHmac("sha256", "8gBm/:&EnhH.1/q")
    .update(message)
    .digest("base64");
  const paymentDetail = {
    amount: order.itemPrice,
    failure_url: "http://localhost:5173/order/" + id,
    product_delivery_charge: String(order.shippingPrice),
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:3000/api/orders/confirmpayment",
    tax_amount: String(order.taxPrice),
    total_amount: String(order.totalPrice),
    transaction_uuid: tran_uuid,
  };
  res.send(paymentDetail);
};

export {
  addOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  payOrder,
  deliverOrder,
  getEsewaPaymentDetails,
};
