'use strict';

Bahmni.Clinical.Specimen = function (specimen, allSamples) {
    var self = this;
    self.dateCollected = specimen && Bahmni.Common.Util.DateUtil.getDateWithoutTime(specimen.dateCollected);
    self.type = specimen && specimen.type;
    self.identifier = specimen && specimen.identifier;
    self.sample = specimen && specimen.sample && specimen.sample.additionalAttributes ? specimen.sample : {additionalAttributes: []};
    self.report = specimen && specimen.report && specimen.report.results ? specimen.report : {results: []};
    self.existingObs = specimen && specimen.existingObs;
    self.typeObservation =  new Bahmni.ConceptSet.SpecimenTypeObservation(self, allSamples);
    self.isDirty = function () {
        return (self.dateCollected && !self.type) || (!self.dateCollected && self.type) || (!self.dateCollected && !self.type && self.identifier) ? true : false
    };

    self.isEmpty = function () {
        return !self.dateCollected && !self.identifier && !self.type;
    };

    function hasResults() {
        return self && self.report && self.report.results && self.report.results.length > 0;
    }

    self.atLeastOneResult = function () {
        return hasResults() && self.report.results[0].value != null;
    };
};