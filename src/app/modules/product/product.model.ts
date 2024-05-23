import { Schema, model } from "mongoose";
import {
  TProduct,
  TProductInventory,
  TProductVariant,
} from "./product.interface";

// Define schema for product variant
const productVariantSchema = new Schema<TProductVariant>({
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
const productInventorySchema = new Schema<TProductInventory>({
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
const productSchema = new Schema<TProduct>({
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
const ProductModel = model<TProduct>("Product", productSchema);
export default ProductModel;
