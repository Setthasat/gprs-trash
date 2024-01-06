const dotenv = require('dotenv');
const toolController = require('./controller/Tool');
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
const cors = require('cors');
const Model = require('./model/Model');


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

try {
    mongoose.connect(process.env.DB_URL || '');
    console.log('database connected ...');
} catch (err) {
    console.log(err);
}


const toolInstance = new toolController(Model);
app.get("/", (_, res) => {
    res.json({
        result: 'sever start law na ja eiei'
    });
});

app.get('/api/adress', toolInstance.getAllData);
app.post('/api/create/adress', toolInstance.createAdress);
app.get('/api/Forms/:id', toolInstance.findSingleAdress);
app.delete('/api/delete/:id', toolInstance.deleteAdress);


app.listen(7777, () => console.log("Sever running ..."));