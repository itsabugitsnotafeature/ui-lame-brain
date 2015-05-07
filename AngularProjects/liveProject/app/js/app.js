'use strict';

/* App Module */

var featureNotBugApp = angular.module('ItsAFeatureItsNotABug', [
  'ngRoute',
  'toDoControllers',
  'ui.router'
]);

// featureNotBugApp.config(['$routeProvider', '$stateProvider', '$urlRouterProvider'
//   function($routeProvider) {
//     $routeProvider.
//       /////////////////////////////
//       // Main Application        //
//       /////////////////////////////
//       when('/app', {
//         templateUrl: 'index.html',
//         controller: 'ToDoController'
//       }).
//       /////////////////////////////
//       // ToDo Application        //
//       /////////////////////////////
//       when('/todo', {
//         templateUrl: 'partials/todo/todo.html',
//         controller: 'ToDoController'
//       }).
//       /////////////////////////////
//       // Default Application     //
//       /////////////////////////////      
//       otherwise({
//         redirectTo: '/'
//       });
// }]);



featureNotBugApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /indexHome
  $urlRouterProvider.otherwise("/indexHome");
  //
  // Now set up the states
  $stateProvider

    .state('indexHome', {
      url: "/indexHome",
      templateUrl: "partials/indexHome.html"
    })

    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })

    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })

    .state('ToDo', {
      url: "/ToDo",
      templateUrl: "partials/todo/todo.html"
    })

    .state('About', {
      url: "/About",
      templateUrl: "partials/about.html"
    })

    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});




