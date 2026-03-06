import Order from "../models/order.js";
import Product from "../models/Product.js";
import Cart from "../models/cart.js"; 
import mongoose from "mongoose";


export const createOrder = async (req, res, next) => {
    try {
      const { name, email, address } = req.body;
  
      if (!name || !email || !address) {
        return next({
          statusCode: 400,
          message: "Name, email, and address are required to place an order",
        })
      } 
  
      const cart = await Cart.findOne().populate("items.product");
  
      if (!cart || cart.items.length === 0) {
        return next({
          statusCode: 400,
          message: "Cart is empty",
        });
      }
  
      for (const item of cart.items) {
        if (item.quantity > item.product.stock) {
          return next({
            statusCode: 400,
            message: `Insufficient stock for ${item.product.name}`,
          });
        }
      }
  
      
      const orderItems = cart.items.map(item => {
     
        item.product.stock -= item.quantity;
        item.product.save(); 
  
        return {
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
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
        message: "Order created successfully",
        data: order,
      });
  
    } catch (error) {
      next(error);
    }
  };
  export const getOrders = async (req, res, next) => {
    try {
      const orders = await Order.find().populate("items.product");
      res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };
  export const getOrderById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next({
          statusCode: 400,
          message: "Invalid order ID",
        });
      }
  
      const order = await Order.findById(id).populate("items.product");
  
      if (!order) {
        return next({
          statusCode: 404,
          message: "Order not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        data: order,
      });
  
    } catch (error) {
      next(error);
    }
  };
  