/**
 * Created by quintonsheppard on 25/02/15.
 */

;(function(angular){

    'use strict';

    var app = angular.module('MyApp');

    app.controller('ModalCtrl', function($scope, $modalInstance, dataListSrv){
        $scope.ok = function(form, model){

            if(form.$invalid){
                return;
            }

            dataListSrv.addItem({
                name: model.name,
                description: model.description,
                quantity: model.quantity,
                isDone: (model.isDone ? true : false)
            });

            $modalInstance.close();
        };
        $scope.close = function(){
            $modalInstance.dismiss('cancel');
        };
    });

}(angular));