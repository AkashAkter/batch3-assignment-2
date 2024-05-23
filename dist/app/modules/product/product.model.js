"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define schema for product variant
const productVariantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "This field is required"],
    },
    value: {
        type: String,
        required: [true, "This field is required"],
    },
});
// Define schema for product inventory
const productInventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "This field is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "This field is required"],
    },
});
// Define schema for product
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "This field is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "This field is required"],
    },
    price: {
        type: Number,
        required: [true, "This field is required"],
    },
    category: {
        type: String,
        required: [true, "This field is required"],
    },
    tags: {
        type: [String],
        required: [true, "This field is required"],
    },
    variants: {
        type: [productVariantSchema],
        required: [true, "This field is required"],
    },
    inventory: {
        type: productInventorySchema,
        required: [true, "This field is required"],
    },
});
// Create the Product model
const ProductModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = ProductModel;
