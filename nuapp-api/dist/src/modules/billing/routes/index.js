"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingRouter = exports.itemCategoryRouter = exports.itemRouter = void 0;
const item_routes_1 = __importDefault(require("./item.routes"));
exports.itemRouter = item_routes_1.default;
const item_category_routes_1 = __importDefault(require("./item-category.routes"));
exports.itemCategoryRouter = item_category_routes_1.default;
const billing_routes_1 = __importDefault(require("./billing.routes"));
exports.billingRouter = billing_routes_1.default;
