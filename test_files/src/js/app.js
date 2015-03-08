/**
 * Created by quintonsheppard on 01/02/15.
 */

;(function(angular){
    "use strict";

    /**
     * this contains the required global dependencies for the application
     * @type {string[]}
     */
    var requires = [
        "ui.router",
        "ui.bootstrap",
        "aa.formExtensions",
        "aa.notify"
    ];

    /**
     * Main entry point - Main Controller - would be in a seperate file
     * but, unable at present to have the initialisation code at the top of the concatinated file app.min.js - issue with gulp to be resolved.
     * @param $scope
     * @param $modal
     * @param $log
     * @param dataListSrv
     * @constructor
     */
    function MainCtrl($scope, $modal, $log, dataListSrv) {

        dataListSrv.setItems($scope);

        $scope.additem = function(){
            // TODO: Capture detail from user form
            var detail = {
                name: '',
                description: '',
                price: 0.00,
                quantity: 0,
                isDone: false
            };
            dataListSrv.addItem(detail);
        };
        $scope.delItem = function(index){
            dataListSrv.delItem(index);
        };
        $scope.delAll = function(){
            $scope.itemList = dataListSrv.delAll();
        };
        $scope.setDoneStatus = function(status){
            dataListSrv.setDoneStatus(status);
        };
        $scope.itemsExist = function(){
            return dataListSrv.getItemCount() > 0;
        };

        $scope.openModel = function(){
            $modal.open({
                templateUrl: 'itemDetail.html',
                controller: 'ModalCtrl',
                size: ''
            });
        };

    }

    angular.module("MyApp", requires).controller('MainCtrl', MainCtrl).config(function($stateProvider, $urlRouterProvider){
        $stateProvider.state('main', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'mainCtrl'
                }
            }
        });
        $urlRouterProvider.otherwise("/");
    });



}(angular));