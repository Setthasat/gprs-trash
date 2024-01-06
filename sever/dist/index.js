"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const toolController = require('./controller/Tool');
const mongoose_1 = __importDefault(require("mongoose"));
const express = require('express');
const cors = require('cors');
const Model = require('./model/Model');
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = 8888;
try {
    mongoose_1.default.connect(process.env.DB_URL || '');
    console.log('database connected ...');
}
catch (err) {
    console.log(err);
}
const toolInstance = new toolController(Model);
app.get('/api/Forms', toolInstance.getAllData);
app.post('/api/create/adress', toolInstance.createAdress);
app.listen(PORT, console.log(`app running at http://localhost:${PORT}`));
app.listen();
