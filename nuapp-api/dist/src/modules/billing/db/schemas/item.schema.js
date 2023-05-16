"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemUpdateSchema = exports.ItemCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const ItemCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string(),
    code: joi_1.default.string().required(),
    categoryId: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    units: joi_1.default.number().required(),
    measurementUnit: joi_1.default.string().required(),
    lot: joi_1.default.string(),
    expirationDate: joi_1.default.string(),
    laboratory: joi_1.default.string(),
});
exports.ItemCreateSchema = ItemCreateSchema;
const ItemUpdateSchema = joi_1.default.object({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    code: joi_1.default.string(),
    categoryId: joi_1.default.string(),
    price: joi_1.default.number(),
    units: joi_1.default.number(),
    measurementUnit: joi_1.default.string(),
    lot: joi_1.default.string(),
    expirationDate: joi_1.default.string(),
    laboratory: joi_1.default.string(),
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date(),
    __v: joi_1.default.number(),
});
exports.ItemUpdateSchema = ItemUpdateSchema;
