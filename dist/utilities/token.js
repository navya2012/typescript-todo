"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id) => {
    const secret = process.env.JWT_TOKEN;
    return jsonwebtoken_1.default.sign({ _id }, secret, {
        expiresIn: '1d',
    });
};
exports.default = createToken;
//# sourceMappingURL=token.js.map