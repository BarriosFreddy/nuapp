"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpdateSchema = exports.RoleCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const RoleCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    modulesAccess: joi_1.default
        .array()
        .items({
        moduleId: joi_1.default.string(),
        canSee: joi_1.default.boolean(),
        canCreate: joi_1.default.boolean(),
        canUpdate: joi_1.default.boolean(),
        canDelete: joi_1.default.boolean(),
        canExecute: joi_1.default.boolean(),
    })
        .required(),
});
exports.RoleCreateSchema = RoleCreateSchema;
const RoleUpdateSchema = joi_1.default.object({
    name: joi_1.default.string(),
    modulesAccess: joi_1.default.array().items({
        moduleId: joi_1.default.string(),
        canSee: joi_1.default.boolean(),
        canCreate: joi_1.default.boolean(),
        canUpdate: joi_1.default.boolean(),
        canDelete: joi_1.default.boolean(),
        canExecute: joi_1.default.boolean(),
    }),
});
exports.RoleUpdateSchema = RoleUpdateSchema;
