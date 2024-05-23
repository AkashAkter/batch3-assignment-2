import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import ProductValidationSchema from "./product.zod.validation";

// Controller function to create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodParsedData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      data: err,
    });
  }
};

// Controller function to get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const result = await ProductServices.getAllProductFromDB(searchTerm || "");

    const message = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : "Products fetched successfully!";

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
};

// Controller function to get a single product by ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
};

// Controller function to update a single product by ID
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Couldn't update data",
    });
  }
};

// Controller function to delete a single product by ID
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // Extract productId from req.params

    const result = await ProductServices.deleteSingleProductFromDB(productId);

    if (!result) {
      res.status(400).json({
        success: false,
        message: "Failed to delete",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Couldn't delete data",
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
