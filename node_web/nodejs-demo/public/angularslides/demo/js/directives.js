'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);



angular.module('myApp.directives', [])
    .directive('addMenu', function () {
        return {
            restrict: 'EA',
            templateUrl: 'tpl_demo10.html',
            scope: {
                menulist : '=datamodel'
            },
            link: function (scope, elem, attrs) {
                scope.newmemu = {id:100, name:"" };
                scope.csshide = false;

                scope.clickAddMenuButton = function(){
                    scope.csshide = true;
                };

                scope.clickSaveMenuButton = function(){
                    scope.csshide = false;
                    scope.menulist.push(angular.copy(scope.newmemu));
                };
                console.log(scope.menulist);
            }
        };
    });
