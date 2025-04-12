import express from "express";
const router = express.Router();
import { getAllProducts } from "../controller/productController.js";

router.get("/", getAllProducts);

export default router;
