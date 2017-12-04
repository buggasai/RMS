'use strict';
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose'),
  Owner = mongoose.model('Owners');
// to get all the owners
exports.list_all_owners = function (req, res) {
  Owner.find({}, function (err, _owner) {
    if (err)
      res.send(err);
    else {
      var ver = verifyUser(req.params.token);
      if (ver)
        res.json(_owner);
      else {
        res.json('Invalid User!');
      }
    }
  });
};

//to create a owner
exports.create_a_owner = function (req, res) {
  var data = JSON.parse(req.body.data);
  var new_owner = new Owner(data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    new_owner.save(function (err, _owner) {
      if (err)
        res.send(err);
      res.json(_owner);
    });
  }
  else
    res.json('Invalid User!');
};

exports.read_a_owner = function (req, res) {
  Owner.findById(req.params.ownerId, function (err, _owner) {
    if (err)
      res.send(err);
    res.json(_owner);
  });
};

exports.update_a_owner = function (req, res) {
  var data = JSON.parse(req.body.data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    Owner.findOneAndUpdate({ _id: req.params.ownerId }, data, { new: true }, function (err, _owner) {
      if (err)
        res.send(err);
      res.json(_owner);
    });
  }
  else
    res.json('Invalid User!');
};

exports.delete_a_owner = function (req, res) {
  var verify = verifyUser(req.params.token);
  if (verify) {
    Owner.remove({
      _id: req.params.ownerId
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
