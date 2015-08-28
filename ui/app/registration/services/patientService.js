'use strict';

angular.module('bahmni.registration')
    .factory('patientService', ['$http', '$rootScope', function ($http, $rootScope) {
        var openmrsUrl = Bahmni.Registration.Constants.openmrsUrl;
        var baseOpenMRSRESTURL = Bahmni.Registration.Constants.baseOpenMRSRESTURL;

        var search = function (query, addressFieldName, addressFieldValue, customAttributeValue, offset, customAttributeFields) {
            var url = Bahmni.Common.Constants.bahmniSearchUrl + "/patient";
            var config = {
                params: {
                    q: query,
                    s: "byIdOrNameOrVillage",
                    address_field_name: addressFieldName,
                    address_field_value: addressFieldValue,
                    custom_attribute: customAttributeValue,
                    startIndex: offset || 0,
                    patientAttributes: customAttributeFields
                },
                withCredentials: true
            };
            return $http.get(url, config);
        };

        var searchByIdentifier = function(identifier){
            return $http.get(Bahmni.Common.Constants.bahmniSearchUrl + "/patient", {
                method: "GET",
                params: {identifier: identifier},
                withCredentials: true
            });
        };

        var get = function (uuid) {
            var url = openmrsUrl + "/ws/rest/v1/patientprofile/" + uuid;
            var config = {
                method: "GET",
                params: {v: "full"},
                withCredentials: true
            };
            return $http.get(url, config);
        };

        var generateIdentifier = function (selectedIdentifierSourceUUID) {
            var data = {"comment": "New Bahmni Patient"};
            var url = openmrsUrl + "/ws/rest/v1/identifierSource/" + selectedIdentifierSourceUUID + "/identifier";
            var config = {
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type": "application/json"}
            };
            return $http.post(url, data, config);
        };

        var getLatestIdentifier = function (selectedIdentifierSourceUUID) {
            var url = openmrsUrl + "/ws/rest/v1/identifierSource/" + selectedIdentifierSourceUUID;
            var config = {
                method: "GET",
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type": "application/json"}
            };
            return $http.get(url, config);
        };

        var setLatestIdentifier = function (selectedIdentifierSourceUUID, identifier) {
            var url = openmrsUrl + "/ws/rest/v1/identifierSource/" + selectedIdentifierSourceUUID;
            var data = {
                uuid: selectedIdentifierSourceUUID,
                nextSequenceValue: identifier
            };
            return $http.post(url, data);
        };

        var create = function (patient) {
            var data = new Bahmni.Registration.CreatePatientRequestMapper(moment()).mapFromPatient($rootScope.patientConfiguration.personAttributeTypes, patient);
            var url = baseOpenMRSRESTURL + "/patientprofile";
            var config = {
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type": "application/json"}
            };
            return $http.post(url, data, config);
        };

        var update = function (patient, openMRSPatient) {
            var data = new Bahmni.Registration.UpdatePatientRequestMapper(moment()).mapFromPatient($rootScope.patientConfiguration.personAttributeTypes, openMRSPatient, patient);
            var url = baseOpenMRSRESTURL + "/patientprofile/" + openMRSPatient.uuid;
            var config = {
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type": "application/json"}
            };
            return $http.post(url, data, config);
        };

        var updateImage = function (uuid, image) {
            var url = baseOpenMRSRESTURL + "/personimage/";
            var data = {
                "person": {"uuid": uuid},
                "base64EncodedImage": image
            };
            var config = {
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type": "application/json"}
            };
            return $http.post(url, data, config);
        };

        return {
            search: search,
            searchByIdentifier: searchByIdentifier,
            create: create,
            generateIdentifier: generateIdentifier,
            getLatestIdentifier: getLatestIdentifier,
            setLatestIdentifier: setLatestIdentifier,
            update: update,
            get: get,
            updateImage: updateImage
        };
    }]);
