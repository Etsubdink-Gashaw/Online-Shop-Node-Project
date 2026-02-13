import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Quantity must be at least 1"],
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [cartItemSchema],
      validate: {
        validator: function (v) {
          return v.length > 0; // optional: cart cannot be empty if set
        },
        message: "Cart must have at least one item",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
