'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


var Buildings = new mongoose.Schema({
    BuildingName: {
        type: String,
        required: 'BuildingName is required'
    },
    Address1: {
        type: String,
        required: 'Address1 is required'
    },
    Address2: {
        type: String,
        default: ''
    },
    Owner: {
        type: ObjectId,
        required: 'owner is required'
    },
    OwnerName: {
        type: String,
        default: ''
    },
    City: {
        type: String,
        default: ''
    },
    State: {
        type: String,
        default: ''
    },
    ZipCode: {
        type: Number,
        default: ''
    },
    Residential_Commercial: {
        type: String,
        default: ''
    },
    BuildingUnits: [{
        FloorNumber: { type: String, default: '' },
        FlatNumber: { type: String, default: '' },
        PortionType: { type: String, default: '' },
        AreaInSFT: { type: String, default: '' }
    }],
    IsResidential: {
        type: Boolean,
        default: ''
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Buildings', Buildings);