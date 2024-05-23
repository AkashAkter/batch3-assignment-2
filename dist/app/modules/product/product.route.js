"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Route to create a new product
router.post("/products", product_controller_1.ProductControllers.createProduct);
// Route to get all products
router.get("/products", product_controller_1.ProductControllers.getAllProducts);
// Route to get a single product by ID
router.get("/products/:productId", product_controller_1.ProductControllers.getSingleProduct);
// Route to update a single product by ID
router.put("/products/:productId", product_controller_1.ProductControllers.updateSingleProduct);
// Route to delete a single product by ID
router.delete("/products/:productId", product_controller_1.ProductControllers.deleteSingleProduct);
exports.ProductRoutes = router;
