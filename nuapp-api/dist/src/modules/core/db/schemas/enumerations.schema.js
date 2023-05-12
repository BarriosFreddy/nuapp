"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumerationUpdateSchema = exports.EnumerationCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const EnumerationCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string(),
    values: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string(),
        code: joi_1.default.string(),
    })).required(),
});
exports.EnumerationCreateSchema = EnumerationCreateSchema;
const EnumerationUpdateSchema = joi_1.default.object({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
});
exports.EnumerationUpdateSchema = EnumerationUpdateSchema;
