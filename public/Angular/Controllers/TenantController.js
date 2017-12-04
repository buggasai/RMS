"use strict";

app.controller("TenantController", function ($scope, $location, RMSService, globalValues, Upload, $rootScope, commonMethodService) {
    if (sessionStorage.getItem("token")) {
        $scope.TenantsModalShown = false;
        $scope.tenantButton = "Save";
        function GetTenants() {

            var data = commonMethodService.getTenants(sessionStorage.getItem("token")).then(function (response) {
                commonMethodService.setTenants(response.data);
                $scope.Tenants = response.data;
            }, function (error) {
                console.log(error);
            })
        }
        GetTenants();
        var res = commonMethodService.getBuildings().then(function (response) {
            commonMethodService.setBuildings(response.data);
            //$scope.Portions = commonMethodService.
            //$scope.$on('buildingsPortions', function () {
            //    $scope.buildingsPortions = commonMethodService.buildingsPortions;
            //});
        });

        $scope.toggleModalViewTenant = function (id) {
            $scope.TenantsModalShown = !$scope.TenantsModalShown;
            $scope.tenantById = commonMethodService.arrayOfObjectsFilterWithEqualCondition($scope.Tenants, id.id)[0];
            $scope.tenantById.buildingUnit = commonMethodService.arrayOfObjectsFilterWithEqualCondition($scope.tenantById.join_output[0].BuildingUnits, $scope.tenantById.BuildingUnitId)[0];
        };

        $scope.deleteTenant = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                var data = RMSService.deleteTenantById(id, sessionStorage.getItem("token")).then(function (response) {
                    GetTenants();
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }
    else
        $location.path("/login")
});

app.controller("CreateTenantController", function ($scope, $location, RMSService, globalValues, $rootScope, commonMethodService, entityService) {
    if (sessionStorage.getItem("token")) {
        $scope.TenantsModalShown = false;
        $scope.tenantButton = "Save";

        $scope.Buildings = commonMethodService.buildings;


        $scope.bindBuildingUnitByBuildingId = function (id) {
            commonMethodService.setBuildingPortions($scope.Buildings);
            var protionsByBuildingId = commonMethodService.arrayOfObjectsFilterWithEqualCondition(commonMethodService.buildingsPortions, id);
            $scope.Portions = protionsByBuildingId[0].buildingUnits;
        };

        $scope.manageTenant = function (tenantObject) {
            var createTenant = tenantObject;
            createTenant.UserName = sessionStorage.getItem("userName");
            if (createTenant.attachment != undefined && createTenant.attachment.length > 0) {
                entityService.UploadTenantAddressProof(createTenant)
                         .then(function (data) {
                             if (data.data.filePath[0] != null)
                                 createTenant.AddressProof1 = data.data.filePath[0];
                             if (data.data.filePath[1] != null)
                                 createTenant.AddressProof2 = data.data.filePath[1];
                             CreateTenant(createTenant);
                         });
            }
            else {
                CreateTenant(createTenant);
            }
        };

        function CreateTenant(tenantObject) {
            var data = RMSService.insertTenant(sessionStorage.getItem("token"), tenantObject).then(function (response) {
                $location.path("home/Tenants");
            }, function (error) {
                console.log(error);
            })
        }
    }
    else
        $location.path("/login")
});

app.controller("EditTenantController", function ($scope, $location, $stateParams, RMSService, globalValues, $rootScope, commonMethodService, entityService) {
    if (sessionStorage.getItem("token")) {
        $scope.tenantButton = "Update";
        $scope.TenantsModalShown = false;

        //  var tenentObject = commonMethodService.arrayOfObjectsFilterWithEqualCondition(commonMethodService.tenants, $stateParams.id)[0];

        $scope.Buildings = commonMethodService.buildings;

        $scope.Portions = commonMethodService.arrayOfObjectsFilterWithEqualCondition($scope.Buildings, commonMethodService.arrayOfObjectsFilterWithEqualCondition(commonMethodService.tenants, $stateParams.id)[0].BuildingId)[0].BuildingUnits;

        var data = RMSService.getTenantById($stateParams.id, sessionStorage.getItem("token")).then(function (response) {
            $scope.tenantObject = response.data;

            if (response.data.RentDueDate != null)
                $scope.tenantObject.RentDueDate = new Date(response.data.RentDueDate);

            if (response.data.DepositPaidDate != null)
                $scope.tenantObject.DepositPaidDate = new Date(response.data.DepositPaidDate);

            if (response.data.MoveInDate != null)
                $scope.tenantObject.MoveInDate = new Date(response.data.MoveInDate);

            if (response.data.LeaseStartDate != null)
                $scope.tenantObject.LeaseStartDate = new Date(response.data.LeaseStartDate);



        }, function (error) {
            console.log(error);
        })



        $scope.manageTenant = function (tenantObject) { // update
            if (tenantObject.attachment != undefined && tenantObject.attachment.length > 0) {
                entityService.UploadTenantAddressProof(tenantObject)
                         .then(function (data) {
                             if (data.data.filePath[0] != null)
                                 tenantObject.AddressProof1 = data.data.filePath[0];
                             if (data.data.filePath[1] != null)
                                 tenantObject.AddressProof2 = data.data.filePath[1];
                             updateTenant(tenantObject);
                         });
            }
            else {
                updateTenant(tenantObject);
            }
        };


        function updateTenant(tenantObject) {
            var data = RMSService.updateTenantById($stateParams.id, sessionStorage.getItem("token"), tenantObject).then(function (response) {
                $location.path("home/Tenants");
            }, function (error) {
                console.log(error);
            })
        }
    }
    else
        $location.path("/login")
});