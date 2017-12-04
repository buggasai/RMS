'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


var Tenants = new Schema({
    FirstName: {
        type: String,
        required: 'FirstName is required'
    },
    LastName: {
        type: String,
        required: 'LastName is required'
    },
    BuildingId: {
        type: ObjectId,
        required: 'Building is required'
    },
    BuildingName: {
        type: String,
        default: ''
    },
    BuildingUnitId: {
        type: String,
        required: 'Building Unit is required'
    },
    BuildingUnitName: {
        type: String,
        default: ''
    },
    Address1: {
        type: String,
        required: 'Address1 is required'
    },
    Address2: {
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
    Mobile: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        default: ''
    },
    RentAmount: {
        type: Number,
        default: ''
    },
    DepositAmount: {
        type: Number,
        default: ''
    },
    DepositPaidDate: {
        type: Date,
        default: ''
    },
    MoveInDate: {
        type: Date,
        default: ''
    },
    LeaseStartDate: {
        type: Date,
        default: ''
    },
    LeasePeriod: {
        type: Number,
        default: ''
    },
    RentDueDate: {
        type: Date,
        default: ''
    },
    TenantMovedOut: {
        type: Boolean,
        default: ''
    },
    Notes: {
        type: String,
        default: ''
    },
    UserName: {
        type: String,
        required: 'UserName is required'
    },
    AddressProof1: {
        type: String,
        default: ''
    },
    AddressProof2: {
        type: String,
        default: ''
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tenants', Tenants);