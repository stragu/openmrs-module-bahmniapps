
'use strict';

angular.module('bahmni.common.conceptSet')
    .factory('conceptSetService', ['$http', function ($http) {
        var getConceptSetMembers = function (params, cache) {
            return $http.get(Bahmni.Common.Constants.conceptUrl, 
            	{
            		params: params,
            		cache: cache
            	});
        };
        var getConceptByUUID = function(uuid){
            var conceptByUUID = Bahmni.Common.Constants.conceptUrl + '/' + uuid;
            console.log(conceptByUUID);
            return $http.get(conceptByUUID);
        };
        return {
            getConceptSetMembers: getConceptSetMembers,
            getConceptByUUID: getConceptByUUID
        };

    }]);

