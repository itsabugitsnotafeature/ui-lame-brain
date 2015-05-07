'use strict';

/* Global Controllers */

var toDoControllers = angular.module('toDoControllers',[]);

toDoControllers.controller('ToDoController',[ '$scope',
    function($scope){
        $scope.todos = [
          {'title':'Build a todo app','done':false}
         ];

  $scope.addToDo = function(){
    $scope.todos.push({'title':$scope.newToDo, 'done':false});
    $scope.newToDo = '';
  };

  $scope.clearToDo = function(){
    $scope.todos = $scope.todos.filter(function(item){
      return !item.done;
    })

  };


}]);