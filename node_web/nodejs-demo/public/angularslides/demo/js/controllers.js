'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, $rootScope) {
        $scope.menulist =[
            {id:1, name:"Menu11"},
            {id:2, name:"Menu22"},
            {id:3, name:"Menu33"}
        ];



  })
  .controller('MyCtrl2', [function() {

  }]);