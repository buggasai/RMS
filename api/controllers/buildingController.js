'use strict';

var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
  Building = mongoose.model('Buildings');

// to get all the Buildings information
exports.list_all_buildings_Info_old = function (req, res) {
  Building.find({}, function (err, _building) {
    if (err)
      res.send(err);
    else {
      var ver = verifyUser(req.params.token);
      if (ver)
        res.json(_building);
      else {
        res.json('Invalid User!');
      }
    }
  });
};

exports.list_all_buildings_Info = function (req, res) {
  Building.aggregate([
    {
        $lookup:
        {
            from: "owners",
            localField: "Owner",
            foreignField: "_id",
            as: "join_output"
        }
    }
    //,{ $match: { 'join_output.PrescriberID': parseInt(req.params.PrescriberID), 'join_output.ProductName': req.params.ProductName } }
],
    function (err, _buildings) {
        if (err)
            res.send(err);
        else {
            res.json(_buildings);
        }
    });
};



//to create a building
exports.create_a_building = function (req, res) {
  var data = JSON.parse(req.body.data);
  var new_building = new Building(data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    new_building.save(function (err, _building) {
      if (err)
        res.send(err);
      res.json(_building);
    });
  }

};

exports.read_a_building = function (req, res) {
  Building.findById(req.params.buildingId, function (err, _building) {
    if (err)
      res.send(err);
    res.json(_building);
  });
};

exports.update_a_building = function (req, res) {
  var data = JSON.parse(req.body.data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    Building.findOneAndUpdate({ _id: req.params.buildingId }, data, { new: true }, function (err, _building) {
      if (err)
        res.send(err);
      res.json(_building);
    });
  }
  else
    res.json('Invalid User!');
};


exports.delete_a_building = function (req, res) {
  var verify = verifyUser(req.params.token);
  if (verify) {
    Building.remove({
      _id: req.params.buildingId
    }, function (err, _owner) {
      if (err)
        res.send(err);
      res.json({ message: 'Building successfully deleted' });
    });
  }
  else
    res.json('Invalid User!');
};

exports.insertBuildingUnits = function (req, res) {
  var data = JSON.parse(req.body.data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    Building.update(
      { _id: req.params.buildingId },
      { $push: { BuildingUnits: data } },
      { new: true },
      function (err, _building) {
        if (err)
          res.send(err);
        else {
          Building.findById(req.params.buildingId, function (err, _building) {
            if (err)
              res.send(err);
            res.json(_building);
          });
        }
      }
    )
  }
  else
    res.json('Invalid User!');
};

exports.deleteBuildingUnit = function (req, res) {
  var verify = verifyUser(req.params.token);
  if (verify) {

    Building.update({ _id: req.params.buildingId },
      { $pull: { BuildingUnits: { _id: req.params.buildingUnitId } } }, function (err, _owner) {
        if (err)
          res.send(err);
        else {
          Building.findById(req.params.buildingId, function (err, _building) {
            if (err)
              res.send(err);
            res.json(_building);
          });
        }
      })
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