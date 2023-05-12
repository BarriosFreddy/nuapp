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
exports.validateParameters = exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = req;
            req.body = yield schema.validateAsync(body);
            next();
        }
        catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    });
};
exports.validateBody = validateBody;
const validateParameters = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { params } = req;
            req.params = yield schema.validateAsync(params);
            next();
        }
        catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    });
};
exports.validateParameters = validateParameters;
