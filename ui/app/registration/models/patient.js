'use strict';

angular.module('bahmni.registration')
    .factory('patient', ['$q', 'conceptSetService', 'age', function ($q, conceptSetService, age) {
        var create = function () {
            var calculateAge = function () {
                if (this.birthdate) {
                    var birthDate = new Date(this.birthdate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                    this.age = age.fromBirthDate(birthDate);
                }
                else {
                    this.age = { years: null };
                }
            };

            var generateIdentifier = function () {
                if (this.registrationNumber && this.registrationNumber.length > 0) {
                    this.identifier = this.identifierPrefix.name + this.registrationNumber;
                }
                return this.identifier
            };

            var clearRegistrationNumber = function () {
                this.registrationNumber = null;
                this.identifier = null;
            };

            var fullNameLocal = function () {
                var givenNameLocal = this.givenNameLocal || "";
                var middleNameLocal = this.middleNameLocal || "";
                var familyNameLocal = this.familyNameLocal || "";
                return (givenNameLocal.trim() + " " + (middleNameLocal ? middleNameLocal + " " : "" ) + familyNameLocal.trim()).trim();
            };

            var patientAttribute = function(attribute){
                if(this[attribute]){
                    var conceptPromise = conceptSetService.getConceptByUUID(this[attribute]);
                    conceptPromise.success(function (concept){
                       console.log(concept);
                    });
                    return  "";
                }
                return  "";
            };

            var patientAge = function (){
                if(this.age.years <=5 ){
                    return this.age.years.toString() + ' years ' + this.age.months + ' months' ;
                }
                else{
                    return this.age.years.toString() + ' years';
                }
            };

            var getImageData = function () {
                return this.image && this.image.indexOf('data') === 0 ? this.image.replace("data:image/jpeg;base64,", "") : null;
            };

            return {
                address: {},
                age: age.create(),
                calculateAge: calculateAge,
                identifierPrefix: {},
                generateIdentifier: generateIdentifier,
                clearRegistrationNumber: clearRegistrationNumber,
                image: '../images/blank-user.gif',
                fullNameLocal: fullNameLocal,
                patientAge: patientAge,
                patientAttribute: patientAttribute,
                getImageData: getImageData
            };
        };

        return {
            create: create
        }
    }]);
