
/// <reference path="D:\AngulerJs\RMS\RMS\RMS\scripts/angular.min.js" />
"use strict";
var app = angular.module("RMS", ['ui.router', 'ui.bootstrap', 'ui.utils', 'ngFileUpload', "akFileUploader"]);


app.value('globalValues', { token: '', selectedPaymentId: '', selectedBuildingId: '' });


app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/Angular/Templates/Login.htm',
            controller: 'AccountController'

        })
        .state('home', {
            url: '/home',
            templateUrl: '/Angular/Templates/Layout.htm',
            controller: 'LayoutController'
        })
      .state('home.Owners', {
          url: '/Owners',
          templateUrl: '/Angular/Templates/Owner.html',
          controller: 'OwnerController'

      })
     .state('home.CreateOwner', {
         url: '/CreateOwner',
         templateUrl: '/Angular/Templates/CreateOwner.html',
         controller: 'OwnerController',
     })
     .state('home.EditOwner', {
         url: '/EditOwner/:id',
         templateUrl: '/Angular/Templates/CreateOwner.html',
         controller: 'EditOwnerController',
     })
      .state('home.Buildings', {
          url: '/Buildings',
          templateUrl: '/Angular/Templates/Buildings.html',
          controller: 'BuildingController',
      })
    .state('home.CreateBuilding', {
        url: '/CreateBuilding',
        templateUrl: '/Angular/Templates/CreateBuilding.html',
        controller: 'BuildingController',
    })
     .state('home.EditBuilding', {
         url: '/EditBuilding/:id',
         templateUrl: '/Angular/Templates/CreateBuilding.html',
         controller: 'EditBuildingController',
     })
    .state('home.Tenants', {
        url: '/Tenants',
        templateUrl: '/Angular/Templates/Tenant.html',
        controller: 'TenantController',
    })
     .state('home.CreateTenant', {
         url: '/CreateTenant',
         templateUrl: '/Angular/Templates/CreateTenant.html',
         controller: 'CreateTenantController',
     })
    .state('home.EditTenant', {
        url: '/EditTenant/:id',
        templateUrl: '/Angular/Templates/CreateTenant.html',
        controller: 'EditTenantController',
    })
   .state('home.Vendors', {
       url: '/Vendors',
       templateUrl: '/Angular/Templates/Vendors.html',
       controller: 'VendorsController',
   })
    .state('home.CreateVendors', {
        url: '/CreateVendors',
        templateUrl: '/Angular/Templates/CreateVendors.html',
        controller: 'VendorsController',
    })
    .state('home.EditVendors', {
        url: '/EditVendors/:id',
        templateUrl: '/Angular/Templates/CreateVendors.html',
        controller: 'EditVendors',
    })
    .state('home.Payments', {
        url: '/Payments',
        templateUrl: '/Angular/Templates/Payment.html',
        controller: 'PaymentsController',
    })
    .state('home.CreatePayment', {
        url: '/CreatePayment',
        templateUrl: '/Angular/Templates/CreatePayment.html',
        controller: 'PaymentsController',
    })
   .state('home.EditPayment', {
       url: '/EditPayment/:id',
       templateUrl: '/Angular/Templates/CreatePayment.html',
       controller: 'EditPaymentsController',
   })
    .state('home.Expenses', {
        url: '/Expenses',
        templateUrl: '/Angular/Templates/Expenses.html',
        controller: 'ExpensesController',
    })
    .state('home.CreateExpenses', {
        url: '/CreateExpenses',
        templateUrl: '/Angular/Templates/CreateExpenses.html',
        controller: 'ExpensesController',
    })
    .state('home.EditExpenses', {
        url: '/EditExpenses/:id',
        templateUrl: '/Angular/Templates/CreateExpenses.html',
        controller: 'EditExpensesController',
    })
});
//app.config(function(stateHelperProvider, $urlRouterProvider, $ionicConfigProvider) {

//    stateHelperProvider

//    .state({
//        name: 'app',
//        url: '/',
//        abstract: true,
//        templateUrl: 'templates/menu.html',
//        controller: 'MenuCtrl',
//    })
//    .state({
//        name: 'app.user',
//        url: '/user',
//        abstract: true,
//        children:[
//          {
//              name: 'app.user.home',
//              url: '/home',
//              templateUrl: 'templates/landing.html',
//              controller: 'HomeCtrl'
//          },
//          {
//              name: 'app.user.board',
//              url: '/board',
//              templateUrl: 'templates/pta-board.html',
//              controller: 'BoardCtrl'
//          },
//          {
//              name: 'app.user.events',
//              url: 'events',
//              templateUrl: 'templates/events.html',
//              controller: 'EventsCtrl'
//          },
//          {
//              name: 'app.user.chatrooms',
//              url: '/chat-rooms',
//              templateUrl: 'templates/chat-rooms.html',
//              controller: 'RoomsCtrl',
//              children:[
//                {
//                    name: 'app.user.chatrooms.chatroom',
//                    url: '/room',
//                    templateUrl: 'templates/chat-room.html',
//                    params:{
//                        roomId: null,
//                        chatters: null
//                    },
//                    controller: 'ChatCtrl'
//                }
//              ]
//          },
//          {
//              name: 'app.user.profile',
//              url: '/profile',
//              templateUrl: 'templates/user-profile.html',
//              params:{
//                  isNewUser: null
//              },
//              controller: 'UserCtrl'
//          },
//          { name: 'app.user.admin',
//              url: 'admin',
//              abstract: true,
//              children:[
//                {
//                    name: 'app.user.admin.calendar',
//                    url: '/calendar',
//                    params:{
//                        selectedEvent: null,
//                        calendarTitle: 'Volunteer',
//                        isVolunteerSignup: true
//                    },
//                    templateUrl: 'templates/rcalendar.html',
//                    controller: 'CalendarCtrl'
//                },
//                {
//                    name: 'app.user.admin.volunteers',
//                    url: '/volunteers',
//                    params:{
//                        thisHoursVolunteers: null,
//                        thisEvent: null
//                    },
//                    templateUrl: 'templates/admin-interact.html',
//                    controller: 'VolunteerCtrl'
//                },
//                {
//                    name: 'app.user.admin.roles',
//                    url: '/roles',
//                    templateUrl: 'templates/roles.html',
//                    controller: 'RoleCtrl'
//                },
//                {
//                    name: 'app.user.admin.settings',
//                    url: '/settings',
//                    templateUrl: 'templates/settings.html',
//                    controller: 'SettingsCtrl'
//                }
//              ]
//          }
//        ]
//    })

//    .state({
//        name: 'login',
//        url: '/login',
//        templateUrl: 'templates/login.html',
//        controller : 'LoginCtrl'
//    })

//    .state({
//        name: 'signup',
//        url: '/signup',
//        templateUrl: 'templates/signup.html',
//        controller : 'SignupCtrl'
//    });

//    // if none of the above states are matched, use this as the fallback
//    $urlRouterProvider.otherwise('/home');
//    $ionicConfigProvider.scrolling.jsScrolling(false);
//});
