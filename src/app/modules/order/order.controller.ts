/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { zodOrder } from "./order.validation";

// Destructure order services
const { createOrderIntoDB, getAllOrderFromDB } = orderServices;

// Controller function to create an order
export const createOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const { order } = body;

  // Check if order data exists in the request body
  if (!order) {
    return res.send({
      success: false,
      message: "No order data found",
    });
  }

  // Validate order data using Zod schema
  const { data, error } = zodOrder.safeParse(order);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  // Call service function to create the order
  await createOrderIntoDB(data, res);
};

// Controller function to get all orders
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // Prepare query based on email
    const find: any = {};
    if (email) {
      find.email = email;
    }

    // Call service function to get all orders
    const result = await getAllOrderFromDB(find);

    // Prepare response
    const response: any = {
      success: result.length > 0,
      message:
        result.length > 0
          ? "Orders fetched successfully for user email!"
          : "Order Not found",
    };

    // Include data in response if orders are found
    if (result.length > 0) {
      response.data = result;
    }
    res.status(200).json(response);
  } catch {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: "Orders not found",
    });
  }
};

// Export controller functions
export const OrderControllers = {
  createOrder,
  getAllOrder,
};
