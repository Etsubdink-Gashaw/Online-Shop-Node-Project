import Cart from "../models/cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne().populate("items.product");
  
      if (!cart) {
        return res.status(200).json({
          success: true,
          data: { items: [] },
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Cart retrieved successfully",
        data: cart,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const addToCart = async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      let cart = await Cart.findOne();
  
      if (!cart) {
        cart = await Cart.create({ items: [] });
      }
  
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
        });
      }
  
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        data: cart,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const updateCart = async (req, res) => {
    try {
      const { items } = req.body;
  
      let cart = await Cart.findOne();
  
      if (!cart) {
        cart = await Cart.create({ items: [] });
      }
  
      cart.items = items.map(item => ({
        product: item.productId,
        quantity: item.quantity,
      }));
  
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: cart,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const removeFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const cart = await Cart.findOne();
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });
      }
  
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );
  
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Product removed from cart successfully",
        data: cart,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  