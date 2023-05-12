"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountUpdateSchema = exports.UserAccountCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const fields = {
    dniType: joi_1.default.string().required(),
    dni: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    birthdate: joi_1.default.date().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    codePost: joi_1.default.string(),
    phone: joi_1.default.string(),
    address: joi_1.default.string(),
    roles: joi_1.default.array().items(joi_1.default.string()).required(),
};
const UserAccountCreateSchema = joi_1.default.object(Object.assign({}, fields));
exports.UserAccountCreateSchema = UserAccountCreateSchema;
const UserAccountUpdateSchema = joi_1.default.object({
    dniType: joi_1.default.string(),
    dni: joi_1.default.string(),
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    birthdate: joi_1.default.date(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string(),
    codePost: joi_1.default.string(),
    phone: joi_1.default.string(),
    address: joi_1.default.string(),
    roles: joi_1.default.array().items(joi_1.default.string()),
});
exports.UserAccountUpdateSchema = UserAccountUpdateSchema;
