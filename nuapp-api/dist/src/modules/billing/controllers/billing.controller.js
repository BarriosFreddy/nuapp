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
const billing_service_1 = require("../services/billing.service");
const tsyringe_1 = require("tsyringe");
const billingService = tsyringe_1.container.resolve(billing_service_1.BillingService);
class BillingController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { page = 1 } = req.query;
            page = +page;
            const bills = yield billingService.findAll({ page });
            res.status(200).send(bills);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const billing = yield billingService.findOne(id);
            res.status(200).send(billing);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const billing = req.body;
            const savedBill = yield billingService.save(billing);
            res.status(201).send(savedBill);
        });
    }
}
const billingController = new BillingController();
exports.default = billingController;
