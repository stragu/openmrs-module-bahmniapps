'use strict';

angular.module('bahmni.common.uiHelper')
    .controller('DashboardController', ['$rootScope', '$scope', '$state', 'appService', 'locationService', 'spinner', '$bahmniCookieStore', '$window','chromeAppDataService','offlineService',
        function ($rootScope, $scope, $state, appService, locationService, spinner, $bahmniCookieStore, $window, chromeAppDataService, offlineService) {
            $scope.appExtensions = appService.getAppDescriptor().getExtensions($state.current.data.extensionPointId, "link") || [];
            $scope.selectedLocationUuid = {};

            var getCurrentLocation = function () {
                return $bahmniCookieStore.get(Bahmni.Common.Constants.locationCookieName) ? $bahmniCookieStore.get(Bahmni.Common.Constants.locationCookieName) : null;
            };

            var init = function () {
                return locationService.getAllByTag("Login Location").then(function (response) {
                        $scope.locations = response.data.results;
                        $scope.selectedLocationUuid = getCurrentLocation().uuid;
                    }
                );
            };

            var getLocationFor = function(uuid){
                return _.find($scope.locations, function(location){
                    return location.uuid == uuid;
                })
            };

            $scope.isCurrentLocation = function (location) {
                return getCurrentLocation().uuid === location.uuid;
            };

            $scope.syncData = function() {
                if (offlineService.getAppPlatform() === Bahmni.Common.Constants.platformType.android) {
                    Android.populateData(window.location.origin);
                }
                else {
                    var token = spinner.show();
                    chromeAppDataService.populateData().then(function(){
                        spinner.hide(token);
                    });
                }
            };

            $scope.onLocationChange = function () {
                var selectedLocation = getLocationFor($scope.selectedLocationUuid);
                $bahmniCookieStore.remove(Bahmni.Common.Constants.locationCookieName);
                $bahmniCookieStore.put(Bahmni.Common.Constants.locationCookieName, {name: selectedLocation.display, uuid: selectedLocation.uuid},{path: '/', expires: 7});
                $window.location.reload();
            };

            $rootScope.$on('offline', function () {
                $scope.$apply();
            });

            return spinner.forPromise(init());
        }]);