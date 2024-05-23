"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
// Controller function to create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const zodParsedData = product_zod_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    }
    catch (_a) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
// Controller function to get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductFromDB(searchTerm || "");
        const message = searchTerm
            ? `Products matching search term '${searchTerm}' fetched successfully!`
            : "Products fetched successfully!";
        res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Product not found",
        });
    }
});
// Controller function to get a single product by ID
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Product not found",
        });
    }
});
// Controller function to update a single product by ID
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateSingleProductFromDB(productId, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't update data",
        });
    }
});
// Controller function to delete a single product by ID
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params; // Extract productId from req.params
        const result = yield product_service_1.ProductServices.deleteSingleProductFromDB(productId);
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Failed to delete",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't delete data",
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
