angular.module('bahmni.common.uiHelper')
    .controller('imageGalleryController', ['$scope' ,function ($scope) {
        var photos = [];

        angular.forEach($scope.$parent.records, function(record){
            photos.push({src: Bahmni.Common.Constants.documentsPath + '/' + record.imageObservation.value, title: record.concept.name, desc:record.imageObservation.comment, date: record.imageObservation.observationDateTime});
        });
        $scope.imageIndex = $scope.currentObservation ? _.findIndex($scope.$parent.records, function(record){
            return record.imageObservation.uuid === $scope.currentObservation.uuid;
        }) : 0;


        $scope.photos = photos;
        $scope.patient = $scope.$parent.patient;
        $scope.title = $scope.$parent.title;
    }])
    .factory('imageObservationGalleryControl', function(ngDialog){
        var open = function(scope) {
            var previousScrollPosition = $('body').scrollTop();
            ngDialog.open({
                template: 'views/imageObservationGallery.html',
                controller: 'imageGalleryController',
                className: undefined,
                scope: scope
            });
           scope.$on('ngDialog.opened', function (e, $dialog) {
               $('body').scrollTop(0);
            });
           scope.$on('ngDialog.closed', function (e, $dialog) {
               $('body').scrollTop(previousScrollPosition);
            });
        }
        return {open: open}
    })
    .directive('imageObservationGallery', function(imageObservationGalleryControl) {
        var link = function($scope, element, attrs){
            element.click(function(e){
                e.stopPropagation();
                imageObservationGalleryControl.open($scope);
            });
        };

        return{
            link: link,
            scope: {
                imageIndex: "=",
                records: "=imageObservationGallery",
                currentObservation: "=",
                patient: "=",
                title: "@"
            }
        }
    });