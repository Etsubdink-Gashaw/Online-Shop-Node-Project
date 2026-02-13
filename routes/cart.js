import express from "express";
import { getCart, addToCart, updateCart, removeFromCart } from "../controllers/cart.js";


const cartRouter = express.Router();
cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.put("/", updateCart);
cartRouter.delete("/:productId", removeFromCart);

export default cartRouter;