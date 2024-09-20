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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentModels_1 = __importDefault(require("../models/studentModels"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Auth token is required" });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }
    try {
        // Verify the token and cast it to the custom DecodedToken type
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        const { _id } = decodedToken;
        if (!_id) {
            return res.status(401).json({ error: "Invalid token" });
        }
        // Check if the student exists in the database
        const userDetails = yield studentModels_1.default.findById(_id);
        if (!userDetails) {
            return res.status(401).json({ error: `Student ID not found` });
        }
        // Attach user details to the request object and proceed to the next middleware
        req.userDetails = userDetails;
        console.log('middleware', req.userDetails);
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
});
exports.authUser = authUser;
//# sourceMappingURL=authMiddleware.js.map