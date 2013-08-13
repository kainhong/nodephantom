'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('showMenu', function () {
        return {
            restrict: 'EA',
            templateUrl: 'tpl_demo10_edit.html',
            scope: {
                menulist : '=datalistmodel',
                menu : '=datamodel'
            },
            link: function (scope, element, attrs) {
                scope.cssshowmenu = true;

                scope.editMenuButton = function(){
                    scope.cssshowmenu = false;
                };

                scope.saveEditMenuButton = function(){
                    scope.cssshowmenu = true;
                };
                scope.deleteMenuButton = function(){
                    scope.cssshowmenu = true;

                    for(var i = scope.menulist.length-1; i >= 0; i--){
                        if (scope.menulist[i].id == scope.menu.id) {
                            console.log(i, scope.menulist[i].id, scope.menu.id, scope.menulist);
                            scope.menulist.splice(i, 1);
                            element.remove();
                            break;
                        }
                    }
                };


            }
        }
    })
    .directive('addMenu', function () {
        return {
            restrict: 'EA',
            templateUrl: 'tpl_demo10_add.html',
            scope: false,
            link: function (scope, elem, attrs) {
                scope.newmemu = {id:100, name:"" };
                scope.cssshowmenu = true;

                scope.addMenuButton = function(){
                    scope.cssshowmenu = false;
                };

                scope.saveNewMenuButton = function(){
                    scope.cssshowmenu = true;
                    scope.menulist.push(angular.copy(scope.newmemu));
                };


            }
        }
    });


