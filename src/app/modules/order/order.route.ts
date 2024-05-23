import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// Route to create an order
router.post("/orders", OrderControllers.createOrder);

// Route to get all orders
router.get("/orders", OrderControllers.getAllOrder);

export const OrderRoutes = router;
