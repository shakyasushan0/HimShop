import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        qty: { type: Number, default: 1 },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    itemPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      default: "cod",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
