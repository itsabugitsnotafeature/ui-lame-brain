// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when lading on the page, get all the todo's and show them
	$http.get('/api/todos')
	.success(function(data) {
		$scope.todos = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// when submitting the add form, send the text to node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; // clear the form so use is able to enter another todo item
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// delete a todo after marking it complete
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
}