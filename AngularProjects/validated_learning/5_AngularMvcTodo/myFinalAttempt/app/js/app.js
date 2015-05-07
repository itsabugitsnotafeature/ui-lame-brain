/**
 * Angular Module : Todo Application
 */

'use strict'

angular.module('todoListApp', [
	'ngRoute',
	'appController'
	])

	.config(function ($routeProvider) {
		var routeConfig = {
			controller: 'TodoController',
			templateUrl: 'partials/todoView.html'
		}

	$routeProvider
	.when('/',routeConfig)
	.when('/app',routeConfig)
	.otherwise ({
		redirectTo: '/'
	});
});
