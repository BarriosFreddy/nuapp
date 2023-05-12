"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongoose_1 = __importDefault(require("mongoose"));
class ModuleAccess {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ModuleAccess.prototype, "roleCode", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], ModuleAccess.prototype, "canAccess", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], ModuleAccess.prototype, "canCreate", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], ModuleAccess.prototype, "canUpdate", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], ModuleAccess.prototype, "canDelete", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], ModuleAccess.prototype, "canExecute", void 0);
class Module extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Module.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Module.prototype, "code", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Module.prototype, "uri", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Module.prototype, "icon", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ModuleAccess }),
    __metadata("design:type", Array)
], Module.prototype, "access", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Module.prototype, "modifiedBy", void 0);
exports.Module = Module;
const ModuleModel = (0, typegoose_1.getModelForClass)(Module);
exports.default = ModuleModel;
