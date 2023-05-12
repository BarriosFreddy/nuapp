"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillUpdateSchema = exports.BillCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const BillingCreateSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
    billAmount: joi_1.default.number().required(),
    items: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.BillCreateSchema = BillingCreateSchema;
const BillingUpdateSchema = joi_1.default.object({
    code: joi_1.default.string(),
    billAmount: joi_1.default.number(),
    items: joi_1.default.array().items(joi_1.default.string()),
});
exports.BillUpdateSchema = BillingUpdateSchema;
