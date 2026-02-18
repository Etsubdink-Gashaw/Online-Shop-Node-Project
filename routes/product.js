import express from "express";
import validate from "../middleware/validate.js";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import { createProductSchema, updateProductSchema} from "../utils/productValidate.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);
export default router;
