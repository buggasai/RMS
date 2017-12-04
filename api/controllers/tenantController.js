'use strict';

var jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  Tenant = mongoose.model('Tenants');

// var obj;
// var storage = multer.diskStorage({ //multers disk storage settings
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//     obj = req.body;
//   },
//   filename: function (req, file, cb) {
//     var datetimestamp = Date.now();
//     cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
//   }
// });

// var upload = multer({ //multer settings
//   storage: storage
// }).single('aadharFile');

// var upload = multer({ //multer settings
//   storage: storage
// }).single('authorFile');

// to get all the Tenants information
exports.list_all_tenants_Info_old = function (req, res) {
  Tenant.find({}, function (err, _tenant) {
    if (err)
      res.send(err);
    else {
      var ver = verifyUser(req.params.token);
      if (ver)
        res.json(_tenant);
      else {
        res.json('Invalid User!');
      }
    }
  });
};

exports.list_all_tenants_Info = (req, res) => {
  Tenant.aggregate([
      {
          $lookup:
          {
              from: "buildings",
              localField: "BuildingId",
              foreignField: "_id",
              as: "join_output"
          }
      }
      //,{ $match: { 'join_output.PrescriberID': parseInt(req.params.PrescriberID), 'join_output.ProductName': req.params.ProductName } }
  ],
      function (err, _tenant) {
          if (err)
              res.send(err);
          else {
              res.json(_tenant);
          }
      });
};
 

//to create a building
exports.create_a_tenant = function (req, res) {
  var data = JSON.parse(req.body.data);
  var new_tenant = new Tenant(data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    new_tenant.save(function (err, _tenant) {
      if (err)
        res.send(err);
      res.json(_tenant);
    });
  }
 
  // upload(req, res, function (err) {
  //   if (err) {
  //     res.json({ error_code: 1, err_desc: err });
  //     return;
  //   }
  //   res.json({ error_code: 0, err_desc: null });
  // });


};

exports.read_a_tenant = function (req, res) {
  Tenant.findById(req.params.tenantId, function (err, _tenant) {
    if (err)
      res.send(err);
    res.json(_tenant);
  });
};


exports.update_a_tenant = function (req, res) {
  var data = JSON.parse(req.body.data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    Tenant.findOneAndUpdate({ _id: req.params.tenantId }, data, { new: true }, function (err, _tenant) {
      if (err)
        res.send(err);
      res.json(_tenant);
    });
  }
  else
    res.json('Invalid User!');
};


exports.delete_a_tenant = function (req, res) {
  var verify = verifyUser(req.params.token);
  if (verify) {
    Tenant.remove({
      _id: req.params.tenantId
    }, function (err, _owner) {
      if (err)
        res.send(err);
      res.json({ message: 'Owner successfully deleted' });
    });
  }
  else
    res.json('Invalid User!');
};


function verifyUser(token) {
  var flag = true;
  try {
    jwt.verify(token, 'sampletextmsg', { ignoreExpiration: true });
  }
  catch (error) {
    flag = false
  }
  return flag;
}