import { z } from "zod";

// Define Zod schema for TProductVariant
const ProductVariantValidationSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
});

// Define Zod schema for TProductInventory
const ProductInventoryValidationSchema = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
});

// Define Zod schema for TProduct
const ProductValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(ProductVariantValidationSchema),
  inventory: ProductInventoryValidationSchema,
});

export default ProductValidationSchema;
