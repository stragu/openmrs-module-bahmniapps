'use strict';

angular.module('bahmni.admin')
    .controller('ConfigEditorController', ['$scope', '$state', 'configNameInit', 'appNameInit', 'appConfigService',
        'messagingService', 'spinner', 'appService',
        function ($scope, $state, configNameInit, appNameInit, appConfigService, messagingService, spinner, appService) {
            var originalConfig = "";

            appConfigService.getAppConfig(appNameInit, configNameInit).then(function (response) {
                $scope.appConfig = response.data;
                var config = appService.clean(response.data.config);
                originalConfig = config;
                $scope.config = JSON.parse(config);
            });

            $scope.$watch('config', function (json) {
                $scope.config = json;
            }, true);

            $scope.save = function () {
                $scope.appConfig.config = JSON.stringify($scope.config);
                try {
                    JSON.parse($scope.appConfig.config);
                    spinner.forPromise(appConfigService.save($scope.appConfig).then(function (response) {
                        $state.transitionTo($state.current, $state.params, {
                            reload: true,
                            inherit: false,
                            notify: true
                        }).then(function () {
                            messagingService.showMessage('info', 'Saved');
                        });
                    }).catch(function (error) {
                        var message = 'An error has occurred on the server. Information not saved.';
                        messagingService.showMessage('formError', message);
                    }));
                }
                catch (error) {
                    messagingService.showMessage('formError', 'Invalid JSON');
                }
            };

        }]);