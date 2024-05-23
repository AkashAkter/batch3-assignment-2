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
exports.ProductServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// Function to create a new product in the database
const createProductIntoDB = (Product) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.default(Product);
    const result = yield product.save();
    return result;
});
// Function to get all products from the database, with an optional search term for filtering
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield product_model_1.default.find(query);
    return result;
});
// Function to get a single product by its ID
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findOne({ _id: id });
    return result;
});
// Function to update a single product by its ID with provided update data
const updateSingleProductFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document instead of the original
    });
    return result;
});
// Function to delete a single product by its ID
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
};
