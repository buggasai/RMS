"use strict";

app.controller("ExpensesController", function ($scope, $location, RMSService, globalValues, commonMethodService) {

    if (sessionStorage.getItem("token")) {
        $scope.ExpenseModalShown = false;
        $scope.ExpensesButton = "Save";
        var buildingsSelected = [];

        if (globalValues.selectedBuildingId != "") {
            GetExpenses();
        }

        $scope.addExpense = function () {
            if ($('#ddlBuildings').find(":selected").val() != "") {
                $location.path("home/CreateExpenses");
            }
            else {
                alert('select building')
            }
        }
        //get buildings
        RMSService.getBuildings(sessionStorage.getItem("token")).then(function (response) {
            $scope.Buildings = response.data;
        }, function (error) {
            console.log(error);
        })

        //get vendors
        RMSService.getVendors(sessionStorage.getItem("token")).then(function (response) {
            $scope.Vendors = response.data;
        }, function (error) {
            console.log(error);
        })


        //get Expenses
        function GetExpenses() {
            RMSService.getExpenses(sessionStorage.getItem("token")).then(function (response) {
                $scope.Expenses = response.data.filter(matchesId(globalValues.selectedBuildingId));
                $scope.selectedItem = globalValues.selectedBuildingId;
            }, function (error) {
                console.log(error);
            })
        }

        function matchesId(id) {
            return function (element) {
                return element.BuildingId == id;
            }
        }


        $scope.onBuildingChange = function (selectedItem) {
            globalValues.selectedBuildingId = selectedItem;
            GetExpenses();
        }

        $scope.manageExpenses = function (ExpensesObject) {
            var createExpenses = ExpensesObject;
            createExpenses.UserName = globalValues.userName;
            createExpenses.BuildingId = globalValues.selectedBuildingId;
            var data = RMSService.insertExpenses(sessionStorage.getItem("token"), createExpenses).then(function (response) {
                $location.path("home/Expenses");
            }, function (error) {
                console.log(error);
            })
        }
        $scope.toggleExpenseModalShown = function (id) {
            $scope.ExpenseModalShown = !$scope.ExpenseModalShown;
            $scope.ExpensesObject = commonMethodService.arrayOfObjectsFilterWithEqualCondition($scope.Expenses, id.id)[0];
        }


        $scope.deleteExpense = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                RMSService.deleteExpenseById(id, sessionStorage.getItem("token")).then(function (response) {
                    GetExpenses();
                }, function (error) {
                    console.log(error);
                })
            }
        }

    }

});

app.controller("EditExpensesController", function ($scope, $location, RMSService, globalValues, $stateParams) {
    if (sessionStorage.getItem("token")) {
        $scope.BuildingUnitsmodalShown = false;
        $scope.ExpensesButton = "Update";

        RMSService.getVendors(sessionStorage.getItem("token")).then(function (response) {
            $scope.Vendors = response.data;
            getExpenseByExpenseId($stateParams.id);

        }, function (error) {
            console.log(error);
        })

        function getExpenseByExpenseId(expenseId) {
            RMSService.getExpensesById(expenseId, sessionStorage.getItem("token")).then(function (response) {
                $scope.ExpensesObject = response.data;
            }, function (error) {
                console.log(error);
            })
        }

        $scope.manageExpenses = function (expensesObject) {
            var data = RMSService.updateExpenseById($stateParams.id, sessionStorage.getItem("token"), expensesObject).then(function (response) {
                $location.path("home/Expenses");
            }, function (error) {
                console.log(error);
            })
        }
    }

});
