import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
    imageUrl: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v) return true; // allow empty
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v);
        },
        message: "Invalid image URL",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
