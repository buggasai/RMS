var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
    Payment = mongoose.model('Payments');

// get all payments
exports.list_all_payments_Info = (req, res) => {
    Payment.aggregate([
        {
            $lookup:
                {
                    from: "tenants",
                    localField: "TenantId",
                    foreignField: "_id",
                    as: "join_output"
                }
        }
        //,{ $match: { 'join_output.PrescriberID': parseInt(req.params.PrescriberID), 'join_output.ProductName': req.params.ProductName } }
    ],
        function (err, _payment) {
            if (err)
                res.send(err);
            else {
                res.json(_payment);
            }
        });
};

//create Payment
exports.create_a_Payment = function (req, res) {
    var data = JSON.parse(req.body.data);
    console.log(data);
    var new_Payment = new Payment(data);
    var verify = verifyUser(req.params.token);
    console.log(verify);
    if (verify) {
        new_Payment.save(function (err, _payment) {
            if (err)
                res.send(err);
            res.json(_payment);
        });
    }
    else
        res.json('Invalid User!');
};

exports.read_a_payment = function (req, res) {
    Payment.findById(req.params.paymentId, function (err, _expense) {
        if (err)
            res.send(err);
        res.json(_expense);
    });
};

// update the payment
exports.update_a_payment = function (req, res) {
    var data = JSON.parse(req.body.data);
    var verify = verifyUser(req.params.token);
    if (verify) {
        Payment.findOneAndUpdate({ _id: req.params.paymentId }, data, { new: true }, function (err, _expense) {
        if (err)
          res.send(err);
        res.json(_expense);
      });
    }
    else
      res.json('Invalid User!');
  };
// delete payment
exports.delete_a_payment = function (req, res) {
    var verify = verifyUser(req.params.token);
    if (verify) {
        Payment.remove({
            _id: req.params.paymentId
        }, function (err, _payment) {
            if (err)
                res.send(err);
            res.json({ message: 'Payment successfully deleted' });
        });
    }
    else
        res.json('Invalid User!');
};

//verify user
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