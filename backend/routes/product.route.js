import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", checkAuth, checkAdmin, addProduct);
router.put("/:id", checkAuth, checkAdmin, updateProduct);
router.delete("/:id", checkAuth, checkAdmin, deleteProduct);

export default router;
