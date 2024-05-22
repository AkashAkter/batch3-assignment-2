import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (Product: TProduct) => {
  // const result = await ProductModel.create(product);
  const product = new ProductModel(Product);
  const result = await product.save();
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

const updateSingleProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>
) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
