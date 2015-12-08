'use strict';

angular.module('bahmni.admin')
    .directive('formBuilder', ['RecursionHelper', function (RecursionHelper) {
        var controller = function ($scope) {
            $scope.sortableOptions = {
                connectWith: ".form-container",
                //stop: function (e, ui) {
                //    console.log("stop");
                //    var sortable = ui.item.sortable;
                //    sortable.model.sortWeight = sortable.dropindex;
                //    console.log($scope.form);
                //    for (var index in $scope.form.formElements) {
                //        $scope.form.formElements[index].sortWeight = index;
                //    }
                //},
                //update: function (e, ui) {
                //    console.log("update");
                //    console.log($scope.form);
                //    var sortable = ui.item.sortable;
                //    sortable.model.sortWeight = sortable.dropindex;
                //    for (var index in $scope.form.formElements) {
                //        $scope.form.formElements[index].sortWeight = index;
                //    }
                //}

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