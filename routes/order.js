import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/order.js";
import { createOrderSchema } from "../utils/orderValidate.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", validate(createOrderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;