var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
  vendor = mongoose.model('Vendors');

// to get all the vendors information
exports.list_all_Vendors = function (req, res) {
  vendor.find({}, function (err, _vendor) {
    if (err)
      res.send(err);
    else {
      var ver = verifyUser(req.params.token);
      if (ver) {
        //console.log(_vendor);
        res.json(_vendor);
      }
      else {
        res.json('Invalid User!');
      }
    }
  })
};
// create vendor

exports.create_a_Vendors = function (req, res) {
  var data = JSON.parse(req.body.data);
  console.log(data);
  var new_vendor = new vendor(data);
  var verify = verifyUser(req.params.token);
  console.log(verify);
  if (verify) {
    new_vendor.save(function (err, _vendor) {
      if (err)
        res.send(err);
      res.json(_vendor);
    });
  }
  else
    res.json('Invalid User!');
};

//deleting a vendor
exports.delete_a_Vendors = function (req, res) {
  var verify = verifyUser(req.params.token);
  if (verify) {
    vendor.remove({
      _id: req.params.vendorsId
    }, function (err, _vendors) {
      if (err)
        res.send(err);
      res.json({ message: 'Building successfully deleted' });
    });
  }
  else
    res.json('Invalid User!');
}

//get vendor by id
exports.read_a_vendor = function (req, res) {
  vendor.findById(req.params.vendorsId, function (err, _vendors) {
    if (err)
      res.send(err);
    res.json(_vendors);
  });
};

//Update vendor by id
exports.update_a_vendor = function (req, res) {
  var data = JSON.parse(req.body.data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    vendor.findOneAndUpdate({ _id: req.params.vendorsId }, data, { new: true }, function (err, _vendors) {
      if (err)
        res.send(err);
      res.json(_vendors);
    });
  }
  else
    res.json('Invalid User!');
};


//to verify user
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
