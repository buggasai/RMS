var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('jsonwebtoken');

var express = require('express');
app = express();
app.set('superSecret', 'sampletextmsg');

exports.validate_user = function (req, res) {
    var user = new User(req.body);
    User.find({ UserName: req.params.UserName, Password: req.params.Password }, function (err, _user) {
        if (err)
            res.send(err);
        res.json(_user);
    });
};
// to get all the users
exports.list_all_users = function (req, res) {
    User.find({}, function (err, _user) {
        if (err)
            res.send(err);
        res.json(_user);
    });
};
exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    User.findOne({ UserName: new_user.UserName }, function (err, _user) {
        if (err)
            res.send(err);
        if (_user) {
            res.json({ success: false, message: 'UserName already exists. Please enter another name' });
        }
        else if (!_user) {
            new_user.save(function (err, _user) {
                if (err)
                    res.send(err);
                res.json(_user);
            });
        }
    })
};

exports.read_a_user = function (req, res) {
    User.findOne({ UserName: req.params.UserName }, function (err, _user) {
        if (err)
            res.send(err);
        if (!_user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else if (_user) {
            if (_user.Password != req.params.Password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(_user, app.get('superSecret'), { expiresIn: '2 days' });

                //var ver = jwt.verify(token,app.get('superSecret'),{ignoreExpiration:true});

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
};