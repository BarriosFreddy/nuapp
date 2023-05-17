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
exports.roleValidation = void 0;
const tsyringe_1 = require("tsyringe");
const privileges_1 = require("../../modules/core/enums/privileges");
const modules_service_1 = require("../../modules/core/services/modules.service");
const moduleService = tsyringe_1.container.resolve(modules_service_1.ModuleService);
const roleValidation = (modulePrivilege) => {
    return (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [moduleCode, privilege] = modulePrivilege.split(':');
            const { infoUser } = res.locals;
            const module = yield moduleService.findByCode(moduleCode);
            if (!module)
                throw new Error('module not found');
            if (!infoUser)
                throw new Error('infoUser not found');
            const { access } = module;
            if (!access)
                throw new Error('module does not have access configuration');
            const { roles } = infoUser;
            for (const accessData of access) {
                const { roleCode, canAccess, canCreate, canUpdate, canDelete, canExecute, } = accessData;
                const hasRole = roles.some((roleUser) => roleUser === roleCode);
                if (hasRole &&
                    ((privilege === privileges_1.Privilege.ACCESS && canAccess) ||
                        (privilege === privileges_1.Privilege.CREATE && canCreate) ||
                        (privilege === privileges_1.Privilege.UPDATE && canUpdate) ||
                        (privilege === privileges_1.Privilege.DELETE && canDelete) ||
                        (privilege === privileges_1.Privilege.EXECUTE && canExecute)))
                    return next();
            }
            res.status(403).send({ message: 'Not authorized' });
        }
        catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    });
};
exports.roleValidation = roleValidation;
