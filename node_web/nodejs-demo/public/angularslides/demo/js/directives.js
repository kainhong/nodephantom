'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);



angular.module('myApp.directives', [])
    .directive('fundooRating', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                console.log("Recognized the fundoo-rating directive usage");
            }
        }