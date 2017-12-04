var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
  Expense = mongoose.model('Expenses');
  
  
//Get Expenses
exports.list_all_Expenses = function (req, res, callback) {
  Expense.aggregate([
    {
        $lookup:
        {
            from: "vendors",
            localField: "VendorId",
            foreignField: "_id",
            as: "join_output"
        }
    }
    //,{ $match: { 'join_output.BuildingId': parseInt(req.params.buildingId) } }
],
    function (err, _expenses) {
        if (err)
            res.send(err);
        else {
            res.json(_expenses);
        }
    });
}


//create vendor
exports.create_a_Expenses = function (req, res) {
  var data = JSON.parse(req.body.data);
  console.log(data);
  var new_Expenses = new Expense(data);
  var verify = verifyUser(req.params.token);
  console.log(verify);
  if (verify) {
    new_Expenses.save(function (err, _Expenses) {
      if (err)
        res.send(err);
      res.json(_Expenses);
    });
  }
  else
    res.json('Invalid User!');
};

exports.read_a_expense = function (req, res) {
  Expense.findById(req.params.expenseId, function (err, _expense) {
    if (err)
      res.send(err);
    res.json(_expense);
  });
};

exports.update_a_expense = function (req, res) {
  var data = JSON.parse(req.body.data);
  var verify = verifyUser(req.params.token);
  if (verify) {
    Expense.findOneAndUpdate({ _id: req.params.expenseId }, data, { new: true }, function (err, _expense) {
      if (err)
        res.send(err);
      res.json(_expense);
    });
  }
  else
    res.json('Invalid User!');
};

exports.delete_a_expense = function (req, res) {
  var verify = verifyUser(req.params.token);
  if (verify) {
    Expense.remove({
      _id: req.params.expenseId
    }, function (err, _expense) {
      if (err)
        res.send(err);
      res.json({ message: 'Expense successfully deleted' });
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