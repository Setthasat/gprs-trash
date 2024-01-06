const mongoose = require('mongoose');

const BinAddress = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    lat: {
        type: String,
        require: true,
    },
    lon: {
        type: String,
        require: true,
    },
});

const AdressModel = mongoose.model("model", BinAddress);

module.exports = AdressModel;