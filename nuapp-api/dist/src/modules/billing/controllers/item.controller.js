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
const tsyringe_1 = require("tsyringe");
const item_service_1 = require("../services/item.service");
const itemsService = tsyringe_1.container.resolve(item_service_1.ItemService);
class ItemsController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { page = 1, name, code } = req.query;
            page = +page;
            const items = yield itemsService.findAll({ name, code, page });
            res.status(200).send(items);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield itemsService.findOne(id);
            res.status(200).send(item);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = req.body;
            const savedItem = yield itemsService.save(item);
            res.status(201).send(savedItem);
        });
    }
    saveAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = req.body;
            const result = yield itemsService.saveAll(items);
            res.status(201).send(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = req.body;
            const savedItem = yield itemsService.update(id, item);
            savedItem
                ? res.status(201).send(savedItem)
                : res.status(400).send('Something went wrong');
        });
    }
}
const itemController = new ItemsController();
exports.default = itemController;
