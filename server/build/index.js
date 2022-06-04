"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = require("./db/connect");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1>`);
});
const port = Number(process.env.PORT) || 5000;
const start = (port) => {
    try {
        (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server listening at port: ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start(port);
