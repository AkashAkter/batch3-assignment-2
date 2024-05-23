import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

// Function to create a new product in the database
const createProductIntoDB = async (Product: TProduct) => {
  const product = new ProductModel(Product);
  const result = await product.save();
  return result;
};

// Function to get all products from the database, with an optional search term for filtering
const getAllProductFromDB = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    // If a search term is provided, construct a query to match products where the name or description contains the search term (case-insensitive)
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  const result = await ProductModel.find(query);
  return result;
};

// Function to get a single product by its ID
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

// Function to update a single product by its ID with provided update data
const updateSingleProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>
) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document instead of the original
  });
  return result;
};

// Function to delete a single product by its ID
const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
