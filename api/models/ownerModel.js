'use strict';

var mongoose = require('mongoose');

var Owners = new mongoose.Schema({
    FirstName: {
        type: String,
        required: 'FirstName is required'
    },
    LastName: {
        type: String,
        required: 'LastName is required'
    },
    Address1: {
        type: String,
        default: ''
    },
    Address2: {
        type: String
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
    Mobile: {
        type: String,
        default: ''
    },
    HomePhone: {
        type: String,
        default: ''
    },
    WorkPhone: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        required: 'Email is required'
    },
    UserName: {
        type: String,
        required: 'UserName is required'
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Owners', Owners);