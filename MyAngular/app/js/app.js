'use strict';

/* App Module */

var featureNotBugApp = angular.module('ItsAFeatureItsNotABug', [
	'ngRoute',
	'toDoController',
	'dropDownController',
	'ui.router',
	'ui.bootstrap' 
	
]);


/**
 * Experimental Controllers and Modules Go Here
 */






/**
 * Working Controllers and Modules
 * @Scope  {Object} $scope) {	$scope.footer [description]
 * @return {[type]}         [description]
 */
featureNotBugApp.controller('AppShellController', function($scope) {
	$scope.footer = { 
		name: "Main Application Footer", 
		url: "partials/shell/footer.html"
	};
	
	$scope.navigationBar = { 
		name: "Main Navigation Bar", 
		url: "partials/shell/navBar.html"
	};

});


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

		.state('blog', {
			url: "/blog",
			templateUrl: "partials/blog.html",
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

		.state('about', {
			url: "/about",
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


