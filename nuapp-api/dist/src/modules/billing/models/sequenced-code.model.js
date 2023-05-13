"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequencedCode = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let SequencedCode = class SequencedCode {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], SequencedCode.prototype, "prefixPart1", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], SequencedCode.prototype, "prefixPart2", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], SequencedCode.prototype, "sequence", void 0);
SequencedCode = __decorate([
    (0, typegoose_1.modelOptions)({
        options: {
            customName: 'sequenced-codes',
        },
    })
], SequencedCode);
exports.SequencedCode = SequencedCode;
const SequencedCodeModel = (0, typegoose_1.getModelForClass)(SequencedCode);
exports.default = SequencedCodeModel;
