import Order from "../models/order.js";
import Product from "../models/Product.js";
import Cart from "../models/cart.js"; // needed to get cart items
import mongoose from "mongoose";


export const createOrder = async (req, res) => {
    try {
      const { name, email, address } = req.body;
  
      if (!name || !email || !address) {
        return res.status(400).json({
          success: false,
          message: "Customer name, email, and address are required",
        });
      }
  
      const cart = await Cart.findOne().populate("items.product");
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }
  
      // Validate stock
      for (const item of cart.items) {
        if (item.quantity > item.product.stock) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${item.product.name}`,
          });
        }
      }
  
      // Prepare order items & update stock
      const orderItems = cart.items.map(item => {
        // Deduct stock
        item.product.stock -= item.quantity;
        item.product.save(); // async save, could use Promise.all for optimization
  
        return {
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price, // snapshot price
        };
      });
  
      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const order = await Order.create({
        items: orderItems,
        total,
        customer: { name, email, address },
        orderDate: new Date(),
      });
  
      // Clear cart
      cart.items = [];
      await cart.save();
  
      res.status(201).json({
        success: true,
        data: order,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("items.product");
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }
  
      const order = await Order.findById(id).populate("items.product");
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: order,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  