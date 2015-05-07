/**
 * Global Controller unit tests
 */
 (function () {
 	'use strict';

 	describe('Todo Controller', function() {
 		var scope, ctrl, $httpBackend;

 		beforeEach(module('todoListApp'));

 		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
 			$httpBackend = _$httpBackend_;
 			$httpBackend.expectGET('/api/todos').
 			respond([
 				{
	 				todo : "item#1",
					done : false
 				}
 			]);
 			scope = $rootScope.$new();
 			ctrl = $controller('TodoController', {$scope: scope});
 		}));

 		
 	it('Check for get call', function() {
      expect(scope.phones).toEqualData([]);
      $httpBackend.flush();
      expect(scope.todos).toEqualData([{ todo : "item#1", done : false }]);
      
    });

 });
 }());