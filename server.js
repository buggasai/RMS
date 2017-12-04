// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
//var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var mongoose = require('mongoose');			// load the database config
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer'),

User = require('./api/models/userModel'),
Owner = require('./api/models/ownerModel'),
Building = require('./api/models/buildingModel'),
Tenant = require('./api/models/tenantModel'),
Vendor = require('./api/models/vendorModel'),
Expense = require('./api/models/expenseModel'),
Payment = require('./api/models/paymentModel'),

bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://192.168.100.23/RMSDB');
mongoose.connect('mongodb://heroku_r9hn0jzn:echn9ckdip4644i79p2j4blun8@ds129796.mlab.com:29796/heroku_r9hn0jzn');


// configuration ===============================================================
//mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set up a URL route
app.get("/", function (req, res) {
    res.send("Heroku Demo!");
});

// routes ======================================================================
require('./api/routes/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
