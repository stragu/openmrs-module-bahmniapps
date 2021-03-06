angular.module('bahmni.common.uiHelper')
    .directive('providerDirective', function() {
        var template = '<span>'+
                            '<span ng-if="creatorName != providerName">{{creatorName}} on behalf of </span>' +
                            '{{providerName}}' +
                            '<span ng-if="providerDate"> {{providerDate | bahmniTime}} </span>' +
                        '</span>';

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                creatorName: "@",
                providerName: "@",
                providerDate: "="
            },
            template: template
        }
    });