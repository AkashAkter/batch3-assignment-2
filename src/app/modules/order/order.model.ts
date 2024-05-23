import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

// Define schema for order
const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    product: true,
    ref: "Product", // Reference to the Product model
    required: [true, "productId is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

// Create the Order model
const OrderModel = model("Order", orderSchema);
export default OrderModel;
