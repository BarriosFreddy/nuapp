"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryService = void 0;
const base_service_1 = require("../../../helpers/abstracts/base.service");
const item_category_model_1 = __importDefault(require("../models/item-category.model"));
const tsyringe_1 = require("tsyringe");
let ItemCategoryService = class ItemCategoryService extends base_service_1.BaseService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_category_model_1.default.findById(id).exec();
        });
    }
    findAll({ page = 1, name, code, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let filters = {};
            let conditions = [];
            name && conditions.push({ name: new RegExp(`${name}`, 'i') });
            code && conditions.push({ code: new RegExp(`${code}`, 'i') });
            conditions.length > 0 && (filters = Object.assign({ ['$or']: conditions }, filters));
            const categories = yield item_category_model_1.default.find(filters)
                .skip(10 * (page - 1))
                .limit(10)
                .exec();
            return categories;
        });
    }
    save(itemCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                itemCategory.createdAt = new Date();
                return yield item_category_model_1.default.create(itemCategory);
            }
            catch (error) {
                console.log(error);
                return Promise.reject(null);
            }
        });
    }
    update(id, itemCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                itemCategory.updatedAt = new Date();
                yield item_category_model_1.default.updateOne({ _id: id }, itemCategory);
                return this.findOne(id);
            }
            catch (error) {
                console.log(error);
                return Promise.reject(null);
            }
        });
    }
};
ItemCategoryService = __decorate([
    (0, tsyringe_1.singleton)()
], ItemCategoryService);
exports.ItemCategoryService = ItemCategoryService;
