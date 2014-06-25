'use strict';

angular.module('bahmni.registration')
    .factory('patient', ['$q', '$rootScope', 'age', function ($q, $rootScope, age) {
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
                var personAttributeTypes = $rootScope.patientConfiguration.personAttributeTypes;
                var that=this;
                var personAttribute = personAttributeTypes.filter(function(personAttribute){
                    if(personAttribute.name == attribute){
                        return true;
                    }
                })[0];
                var answerConcept = personAttribute['answers'].filter(function(answer){
                    if(that[attribute] && answer.conceptId == that[attribute]){
                        return true;
                    }
                })[0];
                return  answerConcept? answerConcept.description.split('-')[1].trim() : "";
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
