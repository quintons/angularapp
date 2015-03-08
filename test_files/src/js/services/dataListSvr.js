/**
 * Created by quintonsheppard on 25/02/15.
 */

;(function(angular){

    'use strict';

    var app = angular.module('MyApp');

    app.service('dataListSrv', function($http){

        /**
         *
         * @param detail
         * @returns {string}
         */
        function getShortDescription(detail) {
            var items_length = detail.description.length;

            var text = '';
            if (items_length < 50 && items_length > 0) {
                text = detail.description.substring(0, 40);
            }
            if (items_length > 50) {
                text += '...';
            }
            return text;
        }

        /**
         *
         * @param detail
         * @returns {*}
         */
        function getLongDescription(detail) {
            return detail.description.length > 0 ? detail.description : '';
        }

        /**
         * DataListService constructor
         * @constructor
         */
        function DataListService(){
            // contains the items, dybamiclly changed,
            //initially filled from request to js/data/data.json from DataListService.setItems()
            this.items = [];
        }

        /**
         *
         * @type {{constructor: DataListService, addItem: Function, delItem: Function, getItems: Function}}
         */
        DataListService.prototype = {
            constructor: DataListService,
            /**
             *
             * @param detail
             */
            addItem: function(detail){
                this.items.push({
                    name: detail.name,
                    shortDescription: getShortDescription(detail),
                    longDescription: getLongDescription(detail),
                    quantity: detail.quantity,
                    isDone: detail.isDone
                });
            },
            /**
             *
             * @param index
             * @returns {*}
             */
            delItem: function(index){
                this.items.splice(index, 1);
            },
            delAll: function($scope){
                this.items = [];
                return this.items;
            },
            /**
             *
             * @param $scope
             */
            setItems: function($scope){

                var self = this; // capturing the context of the object

                // could be taken from the server, however I am using a json file to show the capture of data
                // test if items exist, if so, I have them already!
                // note: the deletion/update will be done on the client - could be done with a server request
                if(this.items.length === 0) {
                    $http.get('js/data/data.json').success(function (data) {
                        self.items = data.items;
                        var newItems = [];

                        for (var i = 0; i < self.items.length; i++) {
                            var detail = self.items[i];
                            newItems.push({
                                name: detail.name,
                                shortDescription: getShortDescription(detail),
                                longDescription: getLongDescription(detail),
                                quantity: detail.quantity,
                                isDone: detail.isDone
                            });
                        }

                        self.items = newItems;
                        $scope.itemList = self.items;
                    });
                }else{
                    $scope.itemList = this.items;
                }

            },
            getItemCount: function(){
                return this.items.length > 0 ? true : false;
            }
        };

        /**
         * returns DataListService instance
         */
        return new DataListService();
    });

}(angular));