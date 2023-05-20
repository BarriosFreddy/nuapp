"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const BillingCreateSchema = joi_1.default.object({
    receivedAmount: joi_1.default.number().required(),
    billAmount: joi_1.default.number().required(),
    items: joi_1.default
        .array()
        .items(joi_1.default.object({
        _id: joi_1.default.string(),
        name: joi_1.default.string(),
        code: joi_1.default.string(),
        price: joi_1.default.number(),
        units: joi_1.default.number(),
        measurementUnit: joi_1.default.string(),
    }))
        .required(),
});
exports.BillingCreateSchema = BillingCreateSchema;
