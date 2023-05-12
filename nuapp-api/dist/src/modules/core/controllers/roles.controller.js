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
const roles_service_1 = require("../services/roles.service");
const tsyringe_1 = require("tsyringe");
const rolesService = tsyringe_1.container.resolve(roles_service_1.RoleService);
class RolesController {
    findAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield rolesService.findAll();
            res.status(200).send(roles);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const role = yield rolesService.findOne(id);
            res.status(200).send(role);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = req.body;
            const savedRole = yield rolesService.save(role);
            res.status(201).send(savedRole);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const role = req.body;
            const savedRole = yield rolesService.update(id, role);
            savedRole
                ? res.status(201).send(savedRole)
                : res.status(400).send('Something went wrong');
        });
    }
}
const roleController = new RolesController();
exports.default = roleController;
