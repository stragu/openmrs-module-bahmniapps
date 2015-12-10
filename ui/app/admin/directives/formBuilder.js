'use strict';

angular.module('bahmni.admin')
    .directive('formBuilder', ['RecursionHelper', function (RecursionHelper) {
        var controller = function ($scope) {
            $scope.sortableOptions = {
                connectWith: ".form-container",
                //revert: true, for animation
                stop: function (e, ui) {
                    var targetModelList = ui.item.sortable.droptargetModel;
                    var sourceModelList = ui.item.sortable.sourceModel;
                    for (var index in sourceModelList) {
                        sourceModelList[index].sortWeight = index;
                    }
                    for (var index in targetModelList) {
                        targetModelList[index].sortWeight = index;
                    }
                }

            };


            $scope.getView = function(item) {
                if(item){
                    if(item === 'Text') {
                        return '../admin/views/dummyText.html';
                    }
                    else if(item === 'Numeric') {
                        return '../admin/views/dummyNumber.html';
                    }
                    else{
                        return null
                    }
                }
                return null;

            };

        };
        var compile = function (element) {
            return RecursionHelper.compile(element, function () {
            });
        };
        return {
            restrict: 'E',
            compile: compile,
            controller: controller,
            scope: {
                form: "="
            },
            templateUrl: "../admin/views/form.html"
        };
    }]);