'use strict';

/* jasmine specs for controllers go here */

describe('Feature Not a Bug', function() {
	var scope;
	var ctrl;
	
	

	describe('Verifying controller for Drop-down menu controller', function(){
		
		beforeEach(module('toDoController'));

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('ToDoController', {$scope: scope});
		}));

		it('create a Todo list', function() {
			// expect(scope.todos.title).toBe("Hello");
			// console.log(scope.todos);
			
			// var json1 = "{ title : 'SAMPLE : Build a todo app', done : false }";
			// expect(scope.todos).toContain(json1);
			
			/**
			 * Developed
			 */
			 expect(scope.todos.length).toBe(1);

		});

	});






});
