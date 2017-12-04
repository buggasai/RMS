app.service("RMSService", function ($http, $templateCache, Upload, $location, $rootScope) {
    // var url = "http://192.168.100.130:3000/"; // prasad - 190, ravi - 166, gopi - 161   
    var url = "https://rmsservice.herokuapp.com/"; // prasad - 190, ravi - 166, gopi - 161   


    this.isValidUser = function (loginObject) {
        //return $http.get(`${url}authenticate/${loginObject.username}/${loginObject.password}`);
        return $http.get(`authenticate/${loginObject.username}/${loginObject.password}`);
    }

    this.getOwners = function (token) {
       // return $http.get(`${url}Owners/${token}`);
       return $http.get(`Owners/${token}`);
       
    }
    this.insertOwner = function (token, ownerObject) {
        return $http({
            method: "POST",
            url: `Owners/${token}`,
            data: 'data=' + JSON.stringify(ownerObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.getOwnerById = function (id, token) {
        return $http.get(`Owners/${id}/${token}`);
    }
    this.updateOwnerById = function (id, token, ownerObject) {
        return $http({
            method: "PUT",
            url: `Owners/${id}/${token}`,
            data: 'data=' + JSON.stringify(ownerObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.deleteOwnerById = function (id, token) {
        return $http({
            method: "DELETE",
            url: `Owners/${id.id}/${token}`,
            // data: 'data=' + JSON.stringify(ownerObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }


    this.getBuildings = function (token) {
        return $http.get(`building/${token}`);
    }
    this.insertBuilding = function (token, buildingObject) {
        return $http({
            method: "POST",
            url: `building/${token}`,
            data: 'data=' + JSON.stringify(buildingObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.getBuildingById = function (id, token) {
        return $http.get(`building/${id}/${token}`);
    }
    this.updateBuildingById = function (id, token, buildingObject) {
        return $http({
            method: "PUT",
            url: `building/${id}/${token}`,
            data: 'data=' + JSON.stringify(buildingObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.deleteBuildingById = function (id, token) {
        return $http({
            method: "DELETE",
            url: `building/${id.id}/${token}`,
            // data: 'data=' + JSON.stringify(ownerObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }

    this.insertBuildingUnits = function (token, buildingId, buildingUnitsObject) {

        return $http({
            method: "POST",
            url: `building/${buildingId.id}/${token}/true`,
            data: 'data=' + JSON.stringify(buildingUnitsObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.deleteBuildingUnitById = function (buildingId, token, buildingUnitId) {
        return $http({
            method: "DELETE",
            url: `building/${buildingId.id}/${token}/${buildingUnitId.id}/true`,
            // data: 'data=' + JSON.stringify(ownerObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }


    this.getTenants = function (token) {
        return $http.get(`tenents/${token}`);
    }
    this.insertTenant = function (token, tenantObject) {
        return $http({
            method: "POST",
            url: `tenents/${token}`,
            data: 'data=' + JSON.stringify(tenantObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.getTenantById = function (id, token) {
        return $http.get(`tenents/${id}/${token}`);
    }


    this.updateTenantById = function (id, token, tenantObject) {
        return $http({
            method: "PUT",
            url: `tenents/${id}/${token}`,
            data: 'data=' + JSON.stringify(tenantObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }

    this.deleteTenantById = function (id, token) {
        return $http({
            method: "DELETE",
            url: `tenents/${id.id}/${token}`,
            // data: 'data=' + JSON.stringify(ownerObject),
            //data: JSON.stringify(ownerObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }


    //getting vendors
    this.getVendors = function (token) {
        return $http.get(`vendor/${token}`);
    }
    //get vendors By ID
    this.getvendorsById = function (id, token) {
        return $http.get(`vendor/${id}/${token}`);
    }
    this.updatevendorsById = function (id, token, VendorObject) {
        return $http({
            method: "PUT",
            url: `vendor/${id}/${token}`,
            data: 'data=' + JSON.stringify(VendorObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    //inserting vendors
    this.insertVendors = function (token, vendorObject) {
        return $http({
            method: "POST",
            url: `vendor/${token}`,
            data: 'data=' + JSON.stringify(vendorObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    //delete vendor
    this.deleteVendorsById = function (id, token) {
        return $http({
            method: "DELETE",
            url: `vendor/${id.id}/${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }


    //Getting Expenses
    this.getExpenses = function (token) {
        return $http.get(`Expenses/${token}`);
    }
    this.insertExpenses = function (token, expensesObject) {
        return $http({
            method: "POST",
            url: `Expenses/${token}`,
            data: 'data=' + JSON.stringify(expensesObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.getExpensesById = function (id, token) {
        return $http.get(`Expenses/${id}/${token}`);
    }
    this.updateExpenseById = function (id, token, expenseObject) {
        return $http({
            method: "PUT",
            url: `Expenses/${id}/${token}`,
            data: 'data=' + JSON.stringify(expenseObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.deleteExpenseById = function (id, token) {
        return $http({
            method: "DELETE",
            url: `Expenses/${id.id}/${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }

    // Payments
    this.getPayments = function (token) {
        return $http.get(`Payment/${token}`);
    }
    this.insertPayment = function (token, PaymentObject) {
        return $http({
            method: "POST",
            url: `Payment/${token}`,
            data: 'data=' + JSON.stringify(PaymentObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }
    this.getPaymentById = function (id, token) {
        return $http.get(`Payment/${id}/${token}`);
    }
    this.updatePaymentById = function (id, token, paymentObject) {
        return $http({
            method: "PUT",
            url: `Payment/${id}/${token}`,
            data: 'data=' + JSON.stringify(paymentObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }


    this.deletePaymentById = function (id, token) {
        return $http({
            method: "DELETE",
            url: `Payment/${id.id}/${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            cache: $templateCache
        });
    }

});

app.factory("entityService", ["akFileUploaderService", function (akFileUploaderService) {
    var UploadTenantAddressProof = function (tenantObject) {
        return akFileUploaderService.saveModel(tenantObject, "/UploadFile/UploadFiles");
    };
    return {
        UploadTenantAddressProof: UploadTenantAddressProof
    };
}]);


