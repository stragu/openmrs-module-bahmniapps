angular.module('bahmni.common.uiHelper')
    .directive('bmGalleryPane', ['$rootScope', function ($rootScope) {

        $rootScope.$on('$stateChangeStart', function () {
            $('body #gallery-pane').hide();
            $('body #content-supreme').show();
        });

        var link = function ($scope, element) {
            $scope.galleryElement = element;
        };

        var controller = function ($scope) {
            var photos = [];
            angular.forEach($scope.records, function (record) {
                photos.push({src: Bahmni.Common.Constants.documentsPath + '/' + record.imageObservation.value, title: record.concept.name, desc: record.imageObservation.comment, date: record.imageObservation.observationDateTime});
            });

            $scope.currentIndex = $scope.currentObservation ? _.findIndex($scope.records, function (record) {
                return record.imageObservation.uuid === $scope.currentObservation.uuid;
            }) : 0;

            $scope.photos = photos;
            $scope.close = function () {
                $scope.galleryElement.remove();
                $('body #content-supreme').show();
            };
        };

        return {
            link: link,
            controller: controller,
            templateUrl: 'views/imageObservationGallery.html'
        }
    }])
    .directive('imageObservationGallery', ['$compile', function ($compile) {

        var link = function ($scope, element, attrs) {
            var open = function (scope) {
                $('body #content-supreme').hide();
                scope.element = $('body').append($compile("<div bm-gallery-pane id='gallery-pane'></div>")(scope));
            };

            element.click(function (e) {
                e.stopPropagation();
                open($scope);
            });
        };

        return {
            link: link,
            scope: {
                imageIndex: "=",
                records: "=imageObservationGallery",
                currentObservation: "=",
                patient: "=",
                title: "="
            }
        }
    }])
    .directive("popUp", ['$compile', function ($compile) {
        var link = function (scope, elem) {

            var open = function (scope) {
                $('body #content-supreme').hide();
                scope.element = $('body').append($compile("<div bm-gallery-pane id='gallery-pane'></div>")(scope));
            };

            $(elem).click(function () {
                scope.onClickHandler()().then(function (response) {
                    scope.records = new Bahmni.Clinical.PatientFileObservationsMapper().map(response.data.results);
                    scope.title = "Patient Documents";
                    open(scope);
                });
            });
        };
        return {
            link: link,
            scope: {
                onClickHandler: "&",
                patient: "="
            }
        }
    }]);