"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.route('/register').post(auth_1.register);
authRouter.route('/login').post(auth_1.login);
exports.default = authRouter;
