import express from "express";
import { getCart, addToCart, updateCart, removeFromCart } from "../controllers/cart.js";
import {addToCartSchema, updateCartSchema, removeFromCartSchema } from "../utils/cartValidate.js";
import { validate } from "../middleware/validate.js";



const cartRouter = express.Router();
cartRouter.get("/", getCart);
cartRouter.post("/",validate(addToCartSchema), addToCart);
cartRouter.put("/", validate(updateCartSchema), updateCart);
cartRouter.delete("/:productId", validate(removeFromCartSchema), removeFromCart);

export default cartRouter;