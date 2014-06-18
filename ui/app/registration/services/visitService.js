'use strict';

angular.module('bahmni.registration')
    .factory('visitService', ['$http', function ($http) {
    
    var create = function (visit) {
        return $http.post(Bahmni.Registration.Constants.emrApiEncounterUrl , visit, {
            withCredentials: true
        });
    };

    var search = function(parameters) {
        return $http.get(Bahmni.Registration.Constants.webServiceRestBaseURL + '/visit', {
            params: parameters,
            withCredentials: true
        });
    };

    var getRecentMostVisit = function(patientUuid) {
        return $http.get(Bahmni.Registration.Constants.webServiceRestBaseURL + '/visit', {
            params: {includeInactive:true, patient:patientUuid, v:"custom:(uuid,startDatetime)",limit:1},
            withCredentials: true
        });
    };

    return {
        create: create,
        search: search,
        getRecentMostVisit: getRecentMostVisit
    };
}]);