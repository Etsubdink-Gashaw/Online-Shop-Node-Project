import Cart from "../models/cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res, next) => {
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
      next(error);
    }
  };
  
  export const addToCart = async (req, res, next) => {
    try {
      const { productId, quantity = 1 } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return next({
          statusCode: 404,
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
      next(error);
    }
  };
  export const updateCart = async (req, res, next) => {
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
   next(error);
    }
  };
  export const removeFromCart = async (req, res, next) => {
    try {
      const { productId } = req.params;
  
      const cart = await Cart.findOne();
  
      if (!cart) {
        return next({
          statusCode: 404,
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
      next(error);
    }
  };
  