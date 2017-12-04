var mongoose = require('mongoose');
var User = new mongoose.Schema({ 
    UserName:{
        type: String,
        required: 'UserName is required'
    },
    Password:{
        type: String,
    },
    FirstName:{
        type: String,
    },
    LastName:{
        type: String,
    },
    Gender:{
        type: String,
    },
    Email:{
        type: String,
    },
    Mobile:{
        type: String,
    }
});

module.exports = mongoose.model('User',User);