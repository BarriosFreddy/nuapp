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
const enumeration_service_1 = require("../services/enumeration.service");
const tsyringe_1 = require("tsyringe");
const enumerationService = tsyringe_1.container.resolve(enumeration_service_1.EnumerationService);
class EnumerationsController {
    findAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield enumerationService.findAll();
            res.status(200).send(categories);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const enumeration = yield enumerationService.findOne(id);
            res.status(200).send(enumeration);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const enumeration = req.body;
            console.log({ enumeration });
            const savedEnumeration = yield enumerationService.save(enumeration);
            res.status(201).send(savedEnumeration);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const enumeration = req.body;
            const savedEnumeration = yield enumerationService.update(id, enumeration);
            savedEnumeration
                ? res.status(201).send(savedEnumeration)
                : res.status(400).send('Something went wrong');
        });
    }
}
const enumerationController = new EnumerationsController();
exports.default = enumerationController;
