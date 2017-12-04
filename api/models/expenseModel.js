'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Expenses = new mongoose.Schema({
    Description: {
        type: String,
        //required: 'FirstName is required'
    },
    BuildingId: {
        type: ObjectId,
        required: 'Vendor is required'
    },
    VendorId: {
        type: ObjectId,
        required: 'Vendor is required'
    },
    ExpensesAmount: {
        type: String,
        default: ''
    },
    Date: {
        type: Date,
        default: Date.now
    },
    chequeNumber: {
        type: String,
        default: ''
    },
    Catogery: {
        type: String,
        default: ''
    },
    ExpensesRepeat: {
        type: String,
        default: ''
    },
    Note: {
        type: String,
        default: ''
    },
    file: {
        type: String,
        default: ''
    }

});

module.exports = mongoose.model('Expenses', Expenses);