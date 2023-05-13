"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_category_service_1 = require("../services/item-category.service");
const tsyringe_1 = require("tsyringe");
const categoryService = tsyringe_1.container.resolve(item_category_service_1.ItemCategoryService);
class ItemCategoryController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { parse, page = 1, name, code } = req.query;
            page = +page;
            const categories = yield categoryService.findAll({ name, code, page });
            if (parse === 'true') {
                let itemCategoriesParse = categories.map(({ name, _id }) => {
                    return {
                        label: name,
                        value: _id,
                    };
                });
                res.status(200).send(itemCategoriesParse);
                return;
            }
            res.status(200).send(categories);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const itemCategory = yield categoryService.findOne(id);
            res.status(200).send(itemCategory);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemCategory = req.body;
            const savedCategory = yield categoryService.save(itemCategory);
            res.status(201).send(savedCategory);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const itemCategory = req.body;
            const savedCategory = yield categoryService.update(id, itemCategory);
            savedCategory
                ? res.status(201).send(savedCategory)
                : res.status(400).send('Something went wrong');
        });
    }
}
const itemCategoryController = new ItemCategoryController();
exports.default = itemCategoryController;
