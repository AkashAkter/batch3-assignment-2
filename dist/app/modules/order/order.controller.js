"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = exports.getAllOrder = exports.createOrder = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
// Destructure order services
const { createOrderIntoDB, getAllOrderFromDB } = order_service_1.orderServices;
// Controller function to create an order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { data, error } = order_validation_1.zodOrder.safeParse(order);
    if (error) {
        return res.send({
            success: false,
            message: "Invalid order data format",
            error,
        });
    }
    // Call service function to create the order
    yield createOrderIntoDB(data, res);
});
exports.createOrder = createOrder;
// Controller function to get all orders
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        // Prepare query based on email
        const find = {};
        if (email) {
            find.email = email;
        }
        // Call service function to get all orders
        const result = yield getAllOrderFromDB(find);
        // Prepare response
        let message = "";
        if (result.length > 0) {
            message = email
                ? "Orders fetched successfully for user email!"
                : "Orders fetched successfully!";
        }
        else {
            message = email ? "No orders found for user email." : "No orders found.";
        }
        res.status(200).json({
            success: result.length > 0,
            message,
            data: result.length > 0 ? result : null,
        });
    }
    catch (_a) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching orders.",
        });
    }
});
exports.getAllOrder = getAllOrder;
// Export controller functions
exports.OrderControllers = {
    createOrder: exports.createOrder,
    getAllOrder: exports.getAllOrder,
};
