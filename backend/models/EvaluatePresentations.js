const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evapresentationSchema = new Schema({

    title: {
        type: String,
        require: true
    },

    groupno: {
        type: String,
        require: true
    },

    mark1: {
        type: Number,
        require: true
    },
    mark2: {
        type: Number,
        require: true
    },
    mark3: {
        type: Number,
        require: true
    },
    mark4: {
        type: Number,
        require: true
    },





})

const EvaluateDoc = mongoose.model("EvaluatePre", evapresentationSchema);

module.exports = EvaluateDoc;