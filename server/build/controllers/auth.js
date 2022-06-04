"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const register = (req, res) => {
    res.send('register');
};
exports.register = register;
const login = (req, res) => {
    res.send('log in');
};
exports.login = login;
