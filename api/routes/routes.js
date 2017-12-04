'use strict';
module.exports = function (app) {

  var user = require('../controllers/userController');
  var owners = require('../controllers/ownerController');
  var buildings = require('../controllers/buildingController');
  var tenants = require('../controllers/tenantController');
  var vendors = require('../controllers/vendorController');
  var expenses = require('../controllers/expensesController');
  var payments = require('../controllers/paymentController');


  //user Routes
  app.route('/user')
    .get(user.list_all_users)
    .post(user.create_a_user);

  // Validate User
  //app.route('/user/:UserName/:Password')
  // .get(user.validate_user);

  app.route('/authenticate/:UserName/:Password')
    .get(user.read_a_user);


  //owner Routes
  app.route('/owners/:token')
    .get(owners.list_all_owners)
    .post(owners.create_a_owner);

  app.route('/owners/:ownerId/:token')
    .get(owners.read_a_owner)
    .put(owners.update_a_owner)
    .delete(owners.delete_a_owner);



  //Building Routes
  app.route('/building/:token')
    .get(buildings.list_all_buildings_Info)
    .post(buildings.create_a_building);

  app.route('/building/:buildingId/:token')
    .get(buildings.read_a_building)
    .put(buildings.update_a_building)
    .delete(buildings.delete_a_building);

  app.route('/building/:buildingId/:token/:IsAddBuildingUnits')
    .post(buildings.insertBuildingUnits);

  app.route('/building/:buildingId/:token/:buildingUnitId/:IsDeleteBuildingUnits')
    .delete(buildings.deleteBuildingUnit);


  //Tenant Routes
  app.route('/tenents/:token')
    .get(tenants.list_all_tenants_Info)
    .post(tenants.create_a_tenant)

  app.route('/tenents/:tenantId/:token')
    .put(tenants.update_a_tenant)
    .delete(tenants.delete_a_tenant)
    .get(tenants.read_a_tenant);

  // Vendors Routes
  app.route('/vendor/:token')
    .get(vendors.list_all_Vendors)
    .post(vendors.create_a_Vendors)

  app.route('/vendor/:vendorsId/:token')
    .put(vendors.update_a_vendor)
    .delete(vendors.delete_a_Vendors)
    .get(vendors.read_a_vendor);

  // Expensess Routes
  app.route('/Expenses/:token')
    .post(expenses.create_a_Expenses)
    .get(expenses.list_all_Expenses);

  app.route('/Expenses/:expenseId/:token')
    .get(expenses.read_a_expense)
    .put(expenses.update_a_expense)
    .delete(expenses.delete_a_expense);

  // Payment Routes
  app.route('/Payment/:token')
    .get(payments.list_all_payments_Info)
    .post(payments.create_a_Payment)

  app.route('/Payment/:paymentId/:token')
    .get(payments.read_a_payment)
    .put(payments.update_a_payment)
    .delete(payments.delete_a_payment);

};
