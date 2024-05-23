/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import Order from "./order.model";
import { TOrder } from "./order.interface";
import ProductModel from "../product/product.model";

// Function to create an order in the database
const createOrderIntoDB = async (orderData: TOrder, res: Response) => {
  try {
    const productId = orderData.productId;

    const response = {
      success: false,
      message: "",
    };

    // Return if the order quantity is 0
    if (orderData.quantity < 1) {
      response.message = "Insufficient order quantity";
      response.success = false;
      return res.status(400).send(response);
    }

    // Find the product
    const product = await ProductModel.findById(productId);
    if (!product) {
      response.message = "Invalid product id";
      response.success = false;
      return res.status(400).json(response);
    }

    // Check if the product is in stock
    const productData = product.toObject();
    const availableQuantity = productData.inventory.quantity;
    const isStock = productData.inventory.inStock;
    if (!isStock || orderData.quantity > availableQuantity) {
      response.message = "Insufficient quantity available in inventory";
      response.success = false;
      return res.status(400).json(response);
    }

    // Check if the quantity is equal to available quantity
    const isEqualQuantity =
      productData.inventory.quantity === orderData.quantity;

    // Update the isStock property
    if (isEqualQuantity) {
      await ProductModel.findByIdAndUpdate(
        productId,
        { "inventory.inStock": false, "inventory.quantity": 0 },
        { new: true, runValidators: true }
      );
    } else {
      // Set new product quantity
      await ProductModel.findByIdAndUpdate(
        productId,
        {
          "inventory.quantity":
            productData.inventory.quantity - orderData.quantity,
        },
        { new: true, runValidators: true }
      );
    }

    // Set order
    const result = await Order.create(orderData);

    response.message = "Order created successfully!";
    response.success = true;
    res.json({
      ...response,
      data: result,
    });
  } catch (error) {
    // Handle database errors
    res.status(400).send({
      success: false,
      message: "Can't create order",
    });
  }
};

// Function to get all orders from the database
const getAllOrderFromDB = async (find: any) => {
  const result = await Order.find(find);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
