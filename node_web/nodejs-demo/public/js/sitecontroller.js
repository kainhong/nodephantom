'use strict';
/* App Module */

var phantomapp = angular.module('nodeapp', []);
var site = {
    m:{},
    c:{}
};

phantomapp.controller(site.c);

phantomapp.factory('modelSite', function(){

    var sitelist = [
        {
            siteid : 1000,
            sitename : 'Touzi101',
            sitedecription : "网站很不错",
            pagelist : [
                {pageid:10001, pagename:'Homepage',  pagetitle:"Ch2", pageurl:"http://www.touzi101.cn/", screenshotpath:"/1.png" }
            ]
        }

    ]

    var factory = {};

    factory.getSiteList = function () {
        return  sitelist;
    };

    factory.createNewSite = function (sitedata) {
        sitelist.push(sitedata);
        return  sitelist;
    };

    factory.createNewPage = function (sitedata, pagedate) {
        for(var i = sitelist.length; i--;){
            if (sitelist[i].siteid == sitedata.siteid) {
                sitelist[i].pagelist.push(pagedate);
                return ;
            }
        }

        return  sitelist;
    };



    return factory;

});


/* Controllers */
site.c.SiteShowlist = function ($scope, modelSite ) {
    $scope.sitelistdata = modelSite.getSiteList();
    $scope.csspanelsite = true;
    console.log($scope.sitelistdata);

    $scope.newsite = {
        siteid : $scope.sitelistdata[ $scope.sitelistdata.length -1].siteid + 1,
        sitename : '',
        sitedecription : "",
        pagelist : []
    };

    $scope.cssnewsite = false;
    $scope.showaddsitebox = function(){
        $scope.cssnewsite = true;   //显示添加网站的输入框
    }

    $scope.createnewsite = function(){
        var newsite = {
            siteid : $scope.sitelistdata[ $scope.sitelistdata.length -1].siteid + 1,
            sitename : $scope.newsite.sitename,
            sitedecription : $scope.newsite.sitedecription,
            pagelist : $scope.newsite.pagelist
        };
        modelSite.createNewSite(newsite);
        $scope.cssnewsite = false;   //显示添加网站的输入框
    }



    $scope.managePageList = function(sitedata){
        $scope.singlesite = sitedata;
        $scope.csspanelsite = false;   //显示Pagelist的列表
    }

    var maxpageid = 10000;
    $scope.newpage = {
        pageid : 10000,
        pagename :"",
        pagetitle :"",
        pageurl :"",
        screenshotpath : ""
    };


    $scope.cssnewpage = false; //显示添加网站的输入框
    $scope.showaddpagebox = function(){
        $scope.cssnewpage = true;   //显示添加网站的输入框
    }

    $scope.createnewpage = function(){
        maxpageid = maxpageid + 1;
        var newpage = {
            pageid : maxpageid,
            pagename : $scope.newpage.pagename,
            pagetitle : $scope.newpage.pagetitle,
            pageurl : $scope.newpage.pageurl
        };
        modelSite.createNewPage($scope.singlesite, newpage);
        $scope.cssnewpage = false;   //显示添加网站的输入框
    }



};