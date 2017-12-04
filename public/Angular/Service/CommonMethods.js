app.factory("commonMethodService", function ($rootScope, RMSService, globalValues) {

    var commonMethodService = {};
    commonMethodService.buildings = {};
    commonMethodService.buildingsPortions = {};
    commonMethodService.payments = {};


    commonMethodService.tenants = {};

    commonMethodService.setBuildings = function (obj) {
        commonMethodService.buildings = obj;
    }
    commonMethodService.setBuildingPortions = function (obj) {
        var portions = [];
        obj.reduce(function (res, value) {
            if (!res[value._id]) {
                res[value._id] = {
                    _id: value._id,
                    buildingUnits: value.BuildingUnits
                }
                portions.push(res[value._id]);
            }
            return res;
        }, {});
        commonMethodService.buildingsPortions = portions;
        // $rootScope.$broadcast('buildingsPortions');
    }


    commonMethodService.getBuildings = function () {
        return RMSService.getBuildings(sessionStorage.getItem("token"));
    }
    commonMethodService.getBuildingByBuildingId = function (buildingId) {
        return RMSService.getBuildingById(buildingId,sessionStorage.getItem("token"));
    }


    commonMethodService.setTenants = function (obj) {
        commonMethodService.tenants = obj;
    }

    commonMethodService.getTenants = function () {
        return RMSService.getTenants(sessionStorage.getItem("token"));
    }


    



    commonMethodService.arrayOfObjectsFilterWithEqualCondition = function (arrayObject, id) {
        return arrayObject.filter(function (el) {
            return el._id == id
        });
    }


    //var mySharedService = {};

    //mySharedService.values = {};

    //mySharedService.setValues = function (params) {
    //    mySharedService.values = params;
    //    $rootScope.$broadcast('dataPassed');
    //}

    return commonMethodService;
});