"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        const access_token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!access_token) {
            res.status(403).send('authorization token is not valid');
            return;
        }
        if (!SECRET_KEY)
            throw new Error('Secret key has not been set');
        const decodedData = jsonwebtoken_1.default.verify(access_token, SECRET_KEY);
        if (typeof decodedData !== 'string') {
            const { data } = decodedData;
            res.locals.infoUser = data;
        }
        next();
    }
    catch (e) {
        console.error(e);
        res.status(403).send('something went wrong');
    }
};
exports.default = isAuthenticated;
