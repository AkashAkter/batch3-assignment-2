"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", product_route_1.ProductRoutes);
app.use("/api", order_route_1.OrderRoutes);
const getAController = (req, res) => {
    res.send("SERVER IS RUNNING!");
};
app.get("/", getAController);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.use((err, req, res) => {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    });
});
exports.default = app;
