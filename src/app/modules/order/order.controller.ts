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
    let message = "";
    if (result.length > 0) {
      message = email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!";
    } else {
      message = email ? "No orders found for user email." : "No orders found.";
    }

    res.status(200).json({
      success: result.length > 0,
      message,
      data: result.length > 0 ? result : null,
    });
  } catch {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching orders.",
    });
  }
};

// Export controller functions
export const OrderControllers = {
  createOrder,
  getAllOrder,
};
