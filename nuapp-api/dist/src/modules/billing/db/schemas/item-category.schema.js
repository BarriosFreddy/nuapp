"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateSchema = exports.CategoryCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const CategoryCreateSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    description: joi_1.default.string(),
});
exports.CategoryCreateSchema = CategoryCreateSchema;
const CategoryUpdateSchema = joi_1.default.object({
    code: joi_1.default.string(),
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date(),
    __v: joi_1.default.number(),
});
exports.CategoryUpdateSchema = CategoryUpdateSchema;
