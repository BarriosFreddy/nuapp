"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const coreRouter = __importStar(require("./modules/core/routes/index"));
const billingRouter = __importStar(require("./modules/billing/routes/index"));
function registerRoutes(app) {
    app.get('/', (_req, res) => {
        res.send({
            appName: 'Nuapp',
            version: '0.0.1',
            description: 'Platform to support Micro-saas',
        });
    });
    app.use('/user-accounts', coreRouter.userAccountRouter);
    app.use('/roles', coreRouter.roleRouter);
    app.use('/auth', coreRouter.authRouter);
    app.use('/items', billingRouter.itemRouter);
    app.use('/item-categories', billingRouter.itemCategoryRouter);
    app.use('/billings', billingRouter.billingRouter);
    app.use('/enumerations', coreRouter.enumerationsRouter);
}
exports.registerRoutes = registerRoutes;
