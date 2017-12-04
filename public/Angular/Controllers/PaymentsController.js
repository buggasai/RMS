"use strict";

app.controller("PaymentsController", function ($scope, $location, RMSService, globalValues, commonMethodService, entityService) {
    if (sessionStorage.getItem("token")) {
        $scope.PaymentButton = "Save";
        $scope.viewPaymentModalShown = false;

        if (globalValues.selectedPaymentId != "") {
            GetPayments();
        }

        commonMethodService.getTenants().then(function (response) {
            commonMethodService.setTenants(response.data);
            $scope.Tenants = response.data;
        }, function (error) {
            console.log(error);
        })

        $scope.addPayment = function () {
            if ($('#ddlTenants').find(":selected").val() != "") {
                $location.path("home/CreatePayment");
            }
            else {
                alert('select Payment')
            }
        }

        $scope.onTenantChange = function (selectedItem) {
            globalValues.selectedPaymentId = selectedItem;
            GetPayments();
        }
        
        $scope.managePayment = function (PaymentObject) {
            var createPayment = PaymentObject;
            createPayment.UserName = sessionStorage.getItem("userName");

            if (createPayment.attachment != undefined && createPayment.attachment.length > 0) {
                entityService.UploadTenantAddressProof(createPayment)
                         .then(function (data) {
                             if (data.data.filePath[0] != null)
                                 createPayment.Attachment = data.data.filePath[0];
                             CreatePayment(createPayment);

                         });
            }
            else {
                CreatePayment(createPayment);
                
            }
        }

        $scope.togglePaymentModalShown = function (id) {
            $scope.viewPaymentModalShown = !$scope.viewPaymentModalShown;
            $scope.paymentById = commonMethodService.arrayOfObjectsFilterWithEqualCondition($scope.Payments, id.id)[0];
        }

        $scope.deletePayment = function (id) {
            var result = confirm('are you sure to delete');
            if (result) {
                RMSService.deletePaymentById(id, sessionStorage.getItem("token")).then(function (response) {
                    GetPayments();
                }, function (error) {
                    console.log(error);
                })
            }
        }

        function CreatePayment(createPayment) {
            createPayment.TenantId = globalValues.selectedPaymentId;
            var data = RMSService.insertPayment(sessionStorage.getItem("token"), createPayment).then(function (response) {
                $location.path("home/Payments");
            }, function (error) {
                console.log(error);
            })
        }

        function GetPayments() {
            RMSService.getPayments(sessionStorage.getItem("token")).then(function (response) {
                $scope.Payments = response.data.filter(matchesId(globalValues.selectedPaymentId));
                $scope.selectedItem = globalValues.selectedPaymentId;
            }, function (error) {
                console.log(error);
            })
        }

        function matchesId(id) {
            return function (element) {
                return element.TenantId == id;
            }
        }
    }

});


app.controller("EditPaymentsController", function ($stateParams, $scope, $location, RMSService, globalValues, commonMethodService, entityService) {
    if (sessionStorage.getItem("token")) {
        $scope.PaymentButton = "Update";
        $scope.viewPaymentModalShown = false;

        var data = RMSService.getPaymentById($stateParams.id, sessionStorage.getItem("token")).then(function (response) {
            $scope.PaymentObject = response.data;

            if (response.data.Date != null)
                $scope.PaymentObject.Date = new Date(response.data.Date);



        }, function (error) {
            console.log(error);
        })

        $scope.managePayment = function (PaymentObject) { // update
            if (PaymentObject.attachment != undefined && PaymentObject.attachment.length > 0) {
                entityService.UploadTenantAddressProof(PaymentObject)
                         .then(function (data) {
                             if (data.data.filePath[0] != null)
                                 PaymentObject.Attachment = data.data.filePath[0];
                             updatePayment(PaymentObject);
                         });
            }
            else {
                updatePayment(PaymentObject);
            }
        };


        function updatePayment(PaymentObject) {
            var data = RMSService.updatePaymentById($stateParams.id, sessionStorage.getItem("token"), PaymentObject).then(function (response) {
                $location.path("home/Payments");
            }, function (error) {
                console.log(error);
            })
        }
    }
});