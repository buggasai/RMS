"use strict";

app.controller("VendorsController", function ($scope, $location, RMSService, globalValues) {
    $scope.modalShown = false;
    var VendorData;
    var VendorList;
    if (sessionStorage.getItem("token")) {
        $scope.VendorButton = "Save";

        function GetVendors() {
            RMSService.getVendors(sessionStorage.getItem("token")).then(function (response) {
                $scope.Vendors = response.data;
                VendorList = response.data;
            }, function (error) {
                console.log(error);
            })
        }
        VendorData = GetVendors.bind();
        VendorData();

        $scope.manageVendors = function (vendorObject) {
            var createvendor = vendorObject;
            createvendor.UserName = globalValues.userName;
            var data = RMSService.insertVendors(sessionStorage.getItem("token"), createvendor).then(function (response) {
                $location.path("home/Vendors");
            }, function (error) {
                console.log(error);
            })
        }

        //delete vendor
        $scope.deleteVendor = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                RMSService.deleteVendorsById(id, sessionStorage.getItem("token")).then(function (response) {
                    VendorData();

                }, function (error) {
                    console.log(error);
                })
            }
        }
        //vew vendor in popup 
        $scope.toggleModal = function (id) {
            $scope.modalShown = !$scope.modalShown;
            $scope.VendorById = VendorList.filter(matchesId(id))[0];
        }
        function matchesId(id) {
            return function (element) {
                return element._id == id.id;
            }
        }
    }
})


app.controller("EditVendors", function ($scope, RMSService, globalValues, $location, $stateParams) {
    $scope.VendorButton = "Update";

    var data = RMSService.getvendorsById($stateParams.id, sessionStorage.getItem("token")).then(function (response) {
        $scope.VendorsObject = response.data;
        if (response.data.Insured == true)
            $("#chkInsured").prop("checked", true)
        if (response.data.MISC == true)
            $("#chkMisc").prop("checked", true);

    }, function (error) {
        console.log(error);
    })
    $scope.manageVendors = function (VendorObject) {
        var createvendor = VendorObject;
        createOwnwer.UserName = globalValues.userName;
        var data = RMSService.updatevendorsById($stateParams.id, sessionStorage.getItem("token"), VendorObject).then(function (response) {
            $location.path("home/Vendors");
        }, function (error) {
            console.log(error);
        })
    };
});
 