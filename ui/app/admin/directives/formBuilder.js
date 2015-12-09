'use strict';

angular.module('bahmni.admin')
    .directive('formBuilder', ['RecursionHelper', function (RecursionHelper) {
        var controller = function ($scope) {
            $scope.sortableOptions = {
                connectWith: ".form-container",
                stop: function (e, ui) {
                    var targetModelList = ui.item.sortable.droptargetModel;
                    var sourceModelList = ui.item.sortable.sourceModel;
                    for (var index in sourceModelList) {
                        sourceModelList[index].sortWeight = index;
                    }
                    for (var index in targetModelList) {
                        targetModelList[index].sortWeight = index;
                    }
                },
                update: function (e, ui) {
                    ui.item.sortable.model = _.extend({}, ui.item.sortable.model);
                }

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