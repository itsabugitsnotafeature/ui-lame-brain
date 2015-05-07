'use strict';

/* Global Controllers */

var toDoController = angular.module('toDoController',[]);
var dropDownController = angular.module('dropDownController', []);


/**
 * Experimental Controllers and Modules
 */




/**
 * Drop Down Menu Controller
 * @param  {Option1}  $scope) {               $scope.items Description for Option 1
 */
 dropDownController.controller('DropdownCtrl', function($scope) {
  $scope.items = [
  "The first choice!",
  "And another choice for you.",
  "but wait! A third!"
  ];
});


/**
 * Working To-do Controller
 * @$scope Scope of application controller.
 */
 toDoController.controller('ToDoController',[ '$scope',
  function($scope){
    $scope.todos = [
    {
      'title':'SAMPLE : Build a todo app',
      'done':false
    }];
    

    $scope.addToDo = function(){
      $scope.todos.push(
      {
        'title':$scope.newToDo, 
        'done':false
      });
      $scope.newToDo = '';
    };

    $scope.clearToDo = function(){
      $scope.todos = $scope.todos.filter(function(item) {
        return !item.done ;
      });

    };


  }]);


