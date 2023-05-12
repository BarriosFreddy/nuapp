"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthKeyPair = void 0;
const generateAuthKeyPair = (module, privilege) => module.concat(':').concat(privilege);
exports.generateAuthKeyPair = generateAuthKeyPair;
