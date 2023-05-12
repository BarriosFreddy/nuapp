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
const category_service_1 = require("../services/category.service");
const tsyringe_1 = require("tsyringe");
const categoryService = tsyringe_1.container.resolve(category_service_1.CategoryService);
class CategorysController {
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
            const category = yield categoryService.findOne(id);
            res.status(200).send(category);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            const savedCategory = yield categoryService.save(category);
            res.status(201).send(savedCategory);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = req.body;
            const savedCategory = yield categoryService.update(id, category);
            savedCategory
                ? res.status(201).send(savedCategory)
                : res.status(400).send('Something went wrong');
        });
    }
}
const categoryController = new CategorysController();
exports.default = categoryController;
