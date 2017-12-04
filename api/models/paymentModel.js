'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Payment = new mongoose.Schema({
    Amount: {
        type: Number,
        required: 'Amount is required'
    },
    TenantId: {
        type: ObjectId,
        required: 'Tenant is required'
    },
    Date: {
        type: Date,
        required: 'Date is required'
    },
    PaymentForMonth: {
        type: String,
        required: 'Payment for month is required'
    },
    PaymentForYear : {
        type: Number,
        required: 'Payment for year is required'
    },
    Attachment: {
        type: String,
        default: ''
    },
    Note: {
        type: String,
        default: ''
    } 
});

module.exports = mongoose.model('Payments', Payment);