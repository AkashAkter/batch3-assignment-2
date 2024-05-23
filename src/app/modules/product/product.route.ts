import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// Route to create a new product
router.post("/products", ProductControllers.createProduct);

// Route to get all products
router.get("/products", ProductControllers.getAllProducts);

// Route to get a single product by ID
router.get("/products/:productId", ProductControllers.getSingleProduct);

// Route to update a single product by ID
router.put("/products/:productId", ProductControllers.updateSingleProduct);

// Route to delete a single product by ID
router.delete("/products/:productId", ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
