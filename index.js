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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const openai_1 = require("openai");
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5173',
        methods: ['POST', 'GET']
    }
});
app.use(express_1.default.json());
const configuration = new openai_1.Configuration({
    apiKey: process.env.SESSION_TOKEN,
});
const openai = new openai_1.OpenAIApi(configuration);
app.get('/', (req, res) => {
    res.send('<h1>Hi mom</h1>');
});
app.post('/api/v1/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msg } = req.body.data;
    console.log(msg);
    const completion = yield openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(msg),
        temperature: 0.6,
        max_tokens: 1000
    });
    console.log(completion.data.choices[0].text);
    res.status(200).json({ result: completion.data.choices[0].text });
}));
function generatePrompt(str) {
    const capitalizedAnimal = str[0].toUpperCase() + str.slice(1).toLowerCase();
    console.log(capitalizedAnimal);
    return str;
}
app.use((0, cors_1.default)());
const port = Number(process.env.PORT) || 5000;
const start = (port) => {
    server.listen(port, () => {
        process.stdout.write('Local Server:');
        console.log(`\x1b[33m`, ` http://localhost:${port}`);
    });
};
io.on('connect', (socket) => {
    console.log(`User connected with id: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', msg);
    });
});
start(port);
