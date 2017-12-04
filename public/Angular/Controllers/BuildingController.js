"use strict";

app.controller("BuildingController", function ($scope, $location, RMSService, globalValues) {
    if (sessionStorage.getItem("token")) {
        $scope.buildingButton = "Save";
        $scope.BuildingUnitsmodalShown = false;
        $scope.viewBuildingModalShown = false;
        var buildingData;
        var buildingsPortions = [];

        function bindBuildinds() {
            RMSService.getBuildings(sessionStorage.getItem("token")).then(function (response) {
                $scope.Buildings = response.data;
                buildingData = response.data;

                response.data.reduce(function (res, value) {
                    if (!res[value._id]) {
                        res[value._id] = {
                            _id: value._id,
                            buildingUnits: value.BuildingUnits
                        }
                        buildingsPortions.push(res[value._id]);
                    }
                    return res;
                }, {});

            }, function (error) {
                console.log(error);
            })
        }
        bindBuildinds();

        RMSService.getOwners(sessionStorage.getItem("token")).then(function (response) {
            $scope.Owners = response.data;
        }, function (error) {
            console.log(error);
        })

        $scope.toggleModalBuildingUnits = function (id) {
            globalValues.selectedBuildingId = id;
            $scope.BuildingUnitsmodalShown = !$scope.BuildingUnitsmodalShown;
            // $scope.Portions = buildingsPortions.find(x=>x._id = id).buildingUnits;
            $scope.Portions = buildingsPortions.filter(matchesId(id))[0].buildingUnits;

            //$("#tblBuildingUnits").DataTable();
        }
        $scope.toggleModalViewBuilding = function (id) {
            $scope.viewBuildingModalShown = !$scope.viewBuildingModalShown;
            $scope.buildingById = buildingData.filter(matchesId(id))[0];
        }
        function matchesId(id) {
            return function (element) {
                return element._id == id.id;
            }
        }

        $scope.hideModal = function () {
            $('#tblBuildingUnits').parents('div.dataTables_wrapper').first().show();
            $('#btnPortion').show();
            $('#divNewBuildingUnits').hide();
        }
        $scope.showAddPortionDiv = function () {
            //document.getElementById('tblBuildingUnits').style("display:none");
            //document.getElementById('divNewBuildingUnits').style("display:block");
            $('#btnPortion').hide();
            $('#tblBuildingUnits').parents('div.dataTables_wrapper').first().hide();
            $('#divNewBuildingUnits').show();
        }
        function hideAddPortionDiv() {
            $('#btnPortion').show();
            $('#tblBuildingUnits').parents('div.dataTables_wrapper').first().show();
            $('#divNewBuildingUnits').hide();
        }
        $scope.manageBuilding = function (buildingObject) {
            var createBuilding = buildingObject;
            createBuilding.UserName = sessionStorage.getItem("userName");
            createBuilding.OwnerName = $('select[name="owner"] option:selected').html();
            RMSService.insertBuilding(sessionStorage.getItem("token"), createBuilding).then(function (response) {
                $location.path("home/Buildings");
            }, function (error) {
                console.log(error);
            })
        }
        $scope.deleteBuilding = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                RMSService.deleteBuildingById(id, sessionStorage.getItem("token")).then(function (response) {
                    bindBuildinds();

                }, function (error) {
                    console.log(error);
                })
            }
        }
        $scope.manageBuildingUnits = function (buildingUnitsObject) {

            RMSService.insertBuildingUnits(sessionStorage.getItem("token"), globalValues.selectedBuildingId, buildingUnitsObject).then(function (response) {
                hideAddPortionDiv();
                $scope.Portions = response.data.BuildingUnits;
            }, function (error) {
                console.log(error);
            })
        }
        $scope.deleteBuildingUnit = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                RMSService.deleteBuildingUnitById(globalValues.selectedBuildingId, sessionStorage.getItem("token"), id).then(function (response) {
                    $scope.Portions = response.data.BuildingUnits;
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }
    else
        $location.path("/login")
});

app.controller("EditBuildingController", function ($scope, $location, RMSService, globalValues, $stateParams) {
    if (sessionStorage.getItem("token")) {

        $scope.BuildingUnitsmodalShown = false;
        $scope.buildingButton = "Update";
        //$scope.getChecked = function (para) {
        //    if (para)
        //        return true;
        //    else
        //        return false;
        //};


        RMSService.getOwners(sessionStorage.getItem("token")).then(function (response) {
            $scope.Owners = response.data;
            getBuildingById();
        }, function (error) {
            console.log(error);
        })

        function getBuildingById() {
            var data = RMSService.getBuildingById($stateParams.id, sessionStorage.getItem("token")).then(function (response) {
                response.data.IsResidential = Boolean(response.data.IsResidential);
                $scope.buildingObject = response.data;
            }, function (error) {
                console.log(error);
            })
        }

        $scope.manageBuilding = function (buildingObject) {
            var updateBuilding = buildingObject;
            updateBuilding.UserName = sessionStorage.getItem("userName");
            updateBuilding.OwnerName = $('select[name="owner"] option:selected').html();
            RMSService.updateBuildingById($stateParams.id, sessionStorage.getItem("token"), updateBuilding).then(function (response) {
                $location.path("home/Buildings");
            }, function (error) {
                console.log(error);
            })
        }
    }
    else
        $location.path("/login")
});