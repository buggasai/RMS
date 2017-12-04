'use strict';

var mongoose = require('mongoose');

var Vendors = new mongoose.Schema({
    FirstName: {
        type: String,
        required: 'FirstName is required'
    },
    LastName: {
        type: String,
        required: 'LastName is required'
    },
    Website: {
        type: String,
        required: 'Website is required'
    },
    Address: {
        type: String,
        default: ''
    },
    City: {
        type: String
    },
    State: {
        type: String,
        default:''
    },
    ZipCode: {
        type: String,
        default:''
    },
    HomePhone: {
        type: String,
        default:''
    },
    WorkPhone: {
        type: String,
        default:''
    },
    Mobile: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        default: ''
    },
    MISC: {      
        type: Boolean,
        default: ''
    },
    Insured: {      
        type: Boolean,
        default: ''
    },

    Note: {      
        type: String,
        default: ''
    }

});

module.exports = mongoose.model('Vendors', Vendors);