import mongoose, { Types,Document } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quentity: number;
  price: number;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: "PENDING"|"CONFORM"|"SHIPED"|"DELIVERED"|"CANCELED";
}

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;