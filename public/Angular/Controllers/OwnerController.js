/// <reference path="D:\AngulerJs\RMS\RMS\RMS\scripts/angular.min.js" />

app.controller("OwnerController", function ($scope, RMSService, globalValues, $location) {
    if (sessionStorage.getItem("token")) {
        $scope.ownerButton = "Save";
        var bindGetOwners;
        var ownersList;
        $scope.modalShown = false;
        
        

        function GetOwners() {
            var data = RMSService.getOwners(sessionStorage.getItem("token")).then(function (response) {
                $scope.Owners = response.data;
                ownersList = response.data;
            }, function (error) {
                console.log(error);
            })
        }
        bindGetOwners = GetOwners.bind();
        bindGetOwners();

        $scope.dataTableOpt = {
            //custom datatable options 
            // or load data through ajax call also
            "aLengthMenu": [[10, 50, 100, -1], [10, 50, 100, 'All']],
        };

        $scope.manageOwner = function (ownerObject) { //create
            var createOwnwer = ownerObject;
            createOwnwer.UserName = sessionStorage.getItem("userName");

            var data = RMSService.insertOwner(sessionStorage.getItem("token"), createOwnwer).then(function (response) {
                //$scope.Owners = response.data;
                //bindGetOwners();
                $location.path("home/Owners");
            }, function (error) {
                console.log(error);
            })

        }

        $scope.toggleModal = function (id) {
            $scope.modalShown = !$scope.modalShown;
            $scope.ownerById = ownersList.filter(matchesId(id))[0];
        };
        function matchesId(id) {
            return function (element) {
                return element._id == id.id;
            }
        }

        $scope.deleteOwner = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                var data = RMSService.deleteOwnerById(id, sessionStorage.getItem("token")).then(function (response) {
                    //$location.path("home/Owners");
                    bindGetOwners();
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }
    else
        $location.path("/login")
});

app.controller("EditOwnerController", function ($scope, RMSService, globalValues, $location, $stateParams) {
    if (sessionStorage.getItem("token")) {
        $scope.ownerButton = "Update";
        var data = RMSService.getOwnerById($stateParams.id, sessionStorage.getItem("token")).then(function (response) {
            $scope.ownerObject = response.data;
        }, function (error) {
            console.log(error);
        })
        $scope.manageOwner = function (ownerObject) { // update
            createOwnwer = ownerObject;
            createOwnwer.UserName = sessionStorage.getItem("userName");
            var data = RMSService.updateOwnerById($stateParams.id, sessionStorage.getItem("token"), ownerObject).then(function (response) {
                $location.path("home/Owners");
            }, function (error) {
                console.log(error);
            })
        };
    }
    else
        $location.path("/login")

});