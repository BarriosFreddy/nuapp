"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const billing_model_1 = __importDefault(require("../models/billing.model"));
const tsyringe_1 = require("tsyringe");
const kardex_transaction_service_1 = require("./kardex-transaction.service");
const kardex_transaction_type_1 = require("../enums/kardex-transaction-type");
const base_service_1 = require("../../../helpers/abstracts/base.service");
const sequenced_code_service_1 = require("./sequenced-code.service");
const dayjs_1 = __importDefault(require("dayjs"));
const kardexTransactionService = tsyringe_1.container.resolve(kardex_transaction_service_1.KardexTransactionService);
const sequencedCodeService = tsyringe_1.container.resolve(sequenced_code_service_1.SequencedCodeService);
let BillingService = class BillingService extends base_service_1.BaseService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield billing_model_1.default.findById(id).exec();
        });
    }
    findAll({ page = 1 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bills = yield billing_model_1.default.find()
                .skip(10 * (page - 1))
                .limit(10)
                .sort({ createdAt: -1 })
                .exec();
            return bills;
        });
    }
    findPerDate(date, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = (0, dayjs_1.default)(date)
                .set('hours', 0)
                .set('minutes', 0)
                .set('seconds', 0)
                .toDate();
            const endDate = (0, dayjs_1.default)(date)
                .set('hours', 23)
                .set('minutes', 59)
                .set('seconds', 59)
                .toDate();
            const billings = yield billing_model_1.default.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }, projection).exec();
            return billings;
        });
    }
    findGreaterThanDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = (0, dayjs_1.default)(date)
                .set('hours', 0)
                .set('minutes', 0)
                .set('seconds', 0)
                .toDate();
            const billings = yield billing_model_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                        },
                    },
                },
                {
                    $project: {
                        createdAt: 1,
                        billAmount: 1,
                    },
                },
                {
                    $addFields: {
                        createdAt: {
                            $substr: ['$createdAt', 0, 10],
                        },
                    },
                },
                {
                    $group: {
                        _id: '$createdAt',
                        billAmount: {
                            $sum: '$billAmount',
                        },
                    },
                },
                {
                    $addFields: {
                        createdAt: {
                            $toDate: '$_id',
                        },
                    },
                },
                {
                    $sort: {
                        createdAt: 1,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        createdAt: '$_id',
                        billAmount: 1,
                    },
                },
            ]).exec();
            return billings;
        });
    }
    save(billing) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                billing.code = yield generateSequencedCode();
                billing.createdAt = new Date();
                const saved = yield billing_model_1.default.create(billing);
                const { items } = saved;
                try {
                    for (var _d = true, items_1 = __asyncValues(items), items_1_1; items_1_1 = yield items_1.next(), _a = items_1_1.done, !_a;) {
                        _c = items_1_1.value;
                        _d = false;
                        try {
                            const item = _c;
                            const kardexTransaction = {
                                code: new Date().getMilliseconds().toString(),
                                type: kardex_transaction_type_1.KardexTransactionType.OUT,
                                itemId: item._id,
                                units: 1,
                            };
                            yield kardexTransactionService.save(kardexTransaction);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = items_1.return)) yield _b.call(items_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return saved;
            }
            catch (error) {
                console.log(error);
                return Promise.reject(null);
            }
        });
    }
    update(_, __) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not Supported');
        });
    }
};
BillingService = __decorate([
    (0, tsyringe_1.singleton)()
], BillingService);
exports.BillingService = BillingService;
function generateSequencedCode() {
    return __awaiter(this, void 0, void 0, function* () {
        let generatedSequencedCode = '';
        const { _id, prefixPart1, prefixPart2, sequence } = (yield sequencedCodeService.findLastOne()) || {};
        if (_id && sequence !== undefined) {
            const newSequence = sequence + 1;
            yield sequencedCodeService.update(_id, newSequence);
            generatedSequencedCode = `${prefixPart1}${prefixPart2}${newSequence}`;
        }
        return generatedSequencedCode;
    });
}
