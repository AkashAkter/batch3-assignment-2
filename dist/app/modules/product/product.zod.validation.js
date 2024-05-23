"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Schema for product variant validation
const ProductVariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    value: zod_1.z.string().min(1),
});
// Schema for product inventory validation
const ProductInventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0),
    inStock: zod_1.z.boolean(),
});
// Schema for product validation
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().min(0),
    category: zod_1.z.string().min(1),
    tags: zod_1.z.array(zod_1.z.string().min(1)),
    variants: zod_1.z.array(ProductVariantValidationSchema),
    inventory: ProductInventoryValidationSchema,
});
exports.default = ProductValidationSchema;
