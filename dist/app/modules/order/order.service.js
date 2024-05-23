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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
// Function to create an order in the database
const createOrderIntoDB = (orderData, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const product = yield product_model_1.default.findById(productId);
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
        const isEqualQuantity = productData.inventory.quantity === orderData.quantity;
        // Update the isStock property
        if (isEqualQuantity) {
            yield product_model_1.default.findByIdAndUpdate(productId, { "inventory.inStock": false, "inventory.quantity": 0 }, { new: true, runValidators: true });
        }
        else {
            // Set new product quantity
            yield product_model_1.default.findByIdAndUpdate(productId, {
                "inventory.quantity": productData.inventory.quantity - orderData.quantity,
            }, { new: true, runValidators: true });
        }
        // Set order
        const result = yield order_model_1.default.create(orderData);
        response.message = "Order created successfully!";
        response.success = true;
        res.json(Object.assign(Object.assign({}, response), { data: result }));
    }
    catch (error) {
        // Handle database errors
        res.status(400).send({
            success: false,
            message: "Can't create order",
        });
    }
});
// Function to get all orders from the database
const getAllOrderFromDB = (find) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find(find);
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
};
