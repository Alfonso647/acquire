'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcquireSchema = new Schema({  
    0: {type: Number},
    1: {type: Number},
    2: {type: Number},
    3: {type: Number},
    4: {type: Number},
    5: {type: Number},
    6: {type: Number},
    featureCount: {type: Number},
    scalerVersion: {type: String},
    createAt: {type: Date},
    targetDate: {type: Date},
    0: {type: Number},
    1: {type: Number},
    2: {type: Number},
    alias: {type: String},
    name: {type: String},
    0: {type: Date},
    1: {type: Date},
    2: {type: Date},
    timeStart: {tpye: Date},
    tiemEnd: {type: Date},
    source: {type: String},
    __v: {type: String}
})

module.exports = mongoose.model("dataModel", AcquireSchema);