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
exports.Item = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const item_category_model_1 = require("./item-category.model");
class Item extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "code", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Item.prototype, "units", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Item.prototype, "measurementUnit", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => item_category_model_1.ItemCategory }),
    __metadata("design:type", Object)
], Item.prototype, "categoryId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Item.prototype, "modifiedBy", void 0);
exports.Item = Item;
const ItemModel = (0, typegoose_1.getModelForClass)(Item);
exports.default = ItemModel;
