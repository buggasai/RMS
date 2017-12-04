app.controller("AccountController", function ($scope, $location, RMSService, globalValues) {


    $scope.Login = function (loginObject) {
        var validUser = RMSService.isValidUser(loginObject).then(function (response) {
            if (response.data.success) {
                globalValues.token = response.data.token;
                sessionStorage.setItem("token", response.data.token);
                globalValues.userName = loginObject.username;
                sessionStorage.setItem("userName", loginObject.username);

                $location.path("/home")
            }
            else {
                $scope.invalidCredentials = "Invalid Credentials";
            }

        }, function (error) {
            console.log(error);
        })
    }
})