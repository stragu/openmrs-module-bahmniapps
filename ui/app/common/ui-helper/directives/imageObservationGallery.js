angular.module('bahmni.common.uiHelper')
    .directive('bmGalleryPane', ['$rootScope', function ($rootScope) {

        var link = function ($scope, element) {
            $scope.galleryElement = element;
        };

        var controller = function ($scope) {

            $scope.photos = [];

            $scope.addImage = function (record) {
                $scope.photos.push({src: Bahmni.Common.Constants.documentsPath + '/' + record.imageObservation.value, title: record.concept.name, desc: record.imageObservation.comment, date: record.imageObservation.observationDateTime});
            };

            angular.forEach($scope.records, function (record) {
                $scope.addImage(record);
            });

            $scope.setCurrentIndex = function () {
                $scope.currentIndex = $scope.currentObservation ? _.findIndex($scope.records, function (record) {
                    return record.imageObservation.uuid === $scope.currentObservation.uuid;
                }) : 0;
            };

            $scope.isActive = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.showPrev = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.photos.length - 1;
            };

            $scope.showNext = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.photos.length - 1) ? ++$scope.currentIndex : 0;
            };

            this.close = function () {
                $rootScope.galleryIsOpen = false;
                $("div[id^='gallerypane']").hide();
                KeyboardJS.clear('right');
                KeyboardJS.clear('left');
            };
            $scope.close = this.close;

            $scope.open = function (galleryId) {
                $scope.setCurrentIndex();
                $rootScope.galleryIsOpen = true;
                KeyboardJS.on('right', function () {
                    $scope.$apply(function () {
                        $scope.showNext();
                    });
                });
                KeyboardJS.on('left', function () {
                    $scope.$apply(function () {
                        $scope.showPrev();
                    });
                });
                $("#" + galleryId).show();
            };

            $scope.cleanup = function (galleryId) {
                $("#" + galleryId).remove();
            }
        };

        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.galleryIsOpen = false;
            $("div[id^='gallerypane']").hide();
            KeyboardJS.clear('right');
            KeyboardJS.clear('left');
        });

        return {
            link: link,
            controller: controller,
            templateUrl: 'views/imageObservationGallery.html'
        }
    }])
    .directive('imageObservationGallery', ['$compile', '$rootScope', function ($compile, $rootScope) {

        var link = function ($scope, element, attrs) {

            var galleryId = "gallerypane" + Date.now().toString();
            var galleryPane = $compile("<div bm-gallery-pane style='display:none;' id='" + galleryId + "'></div>")($scope);
            $('#gallery-supreme').prepend(galleryPane);

            element.click(function (e) {
                galleryPane.scope().open(galleryId);
                $scope.$apply();
            });

            $scope.$on("$destroy", function () {
                element.remove();
                galleryPane.scope().cleanup(galleryId);
            });
        };

        return {
            link: link,
            scope: {
                records: "=imageObservationGallery",
                currentObservation: "=",
                patient: "=",
                title: "="
            }
        }
    }])
    .directive("popUp", ['$compile', function ($compile) {
        var link = function ($scope, elem) {

            var galleryId = "gallerypane" + Date.now().toString();
            var galleryPane = $compile("<div bm-gallery-pane style='display:none;' id='" + galleryId + "'></div>")($scope);
            $('#gallery-supreme').prepend(galleryPane);

            $(elem).click(function (e) {
                $scope.onClickHandler()().then(function (response) {
                    $scope.records = new Bahmni.Clinical.PatientFileObservationsMapper().map(response.data.results);
                    $scope.title = "Patient Documents";

                    galleryPane.scope().photos = [];
                    angular.forEach($scope.records, function (record) {
                        galleryPane.scope().addImage(record);
                    });
                    galleryPane.scope().open(galleryId);
                });
                $scope.$apply();
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